import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "@/components/PageHeader";

// import { v4 as uuid } from "uuid";
import * as Clipboard from "expo-clipboard";
import { IOpenAIMessages, IOpenAIStateWithIndex } from "@/lib/types";
import {
  getChatType,
  getEventSource,
  getFirstN,
  getFirstNCharsOrLess,
} from "@/lib/utils";
import { MODELS } from "@/lib/constants";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Icon } from "@/assets/IconMap";
import Markdown from "@ronradtke/react-native-markdown-display";

const Stats = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const styles = getStyles();

  let chatType = MODELS.gptTurbo;

  const [openaiMessages, setOpenaiMessages] = useState<IOpenAIMessages[]>([]);
  const [openaiResponse, setOpenaiResponse] = useState<IOpenAIStateWithIndex>({
    messages: [],
    index: "0",
  });

  async function chat() {
    if (!input) return;
    Keyboard.dismiss();

    generateOpenaiResponse();
  }

  async function copyToClipboard(text: string) {
    await Clipboard.setStringAsync(text);
  }

  async function generateOpenaiResponse() {
    try {
      setLoading(true);

      // set message state for openai to have context on previous conversations
      let messagesRequest = getFirstN({ messages: openaiMessages });
      if (openaiResponse.messages.length) {
        messagesRequest = [
          ...messagesRequest,
          {
            role: "assistant",
            content: getFirstNCharsOrLess(
              openaiResponse.messages[openaiResponse.messages.length - 1]
                .assistant
            ),
          },
        ];
      }
      messagesRequest = [...messagesRequest, { role: "user", content: input }];
      setOpenaiMessages(messagesRequest);

      // set local openai state to dislay user's most recent question
      let openaiArray = [
        ...openaiResponse.messages,
        {
          user: input,
          assistant: "",
        },
      ];
      setOpenaiResponse((c) => ({
        index: c.index,
        messages: JSON.parse(JSON.stringify(openaiArray)),
      }));

      let localResponse = "";
      const eventSourceArgs = {
        body: {
          messages: messagesRequest,
          model: chatType.label,
        },
        type: getChatType(chatType),
      };
      setInput("");
      const eventSource = getEventSource(eventSourceArgs);

      console.log("eventSource", eventSource);

      console.log("about to open listener...");
      const listener = (event: any) => {
        console.log("event", event);

        if (event.type === "open") {
          console.log("Open SSE connection.");
          setLoading(false);
        } else if (event.type === "message") {
          if (event.data !== "[DONE]") {
            if (localResponse.length < 850) {
              scrollViewRef.current?.scrollToEnd({
                animated: true,
              });
            }
            // if (!JSON.parse(event.data).content) return
            localResponse = localResponse + JSON.parse(event.data).content;
            openaiArray[openaiArray.length - 1].assistant = localResponse;
            setOpenaiResponse((c) => ({
              index: c.index,
              messages: JSON.parse(JSON.stringify(openaiArray)),
            }));
          } else {
            setLoading(false);
            eventSource.close();
          }
        } else if (event.type === "error") {
          console.error("Connection error:", event.message);
          setLoading(false);
          eventSource.close();
        } else if (event.type === "exception") {
          console.error("Error:", event.message, event.error);
          setLoading(false);
          eventSource.close();
        }
      };
      eventSource.addEventListener("open", listener);
      eventSource.addEventListener("message", listener);
      eventSource.addEventListener("error", listener);
    } catch (err) {
      console.log("error in generateOpenaiResponse: ", err);
    }
  }

  async function showClipboardActionsheet(text: string) {
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options: ["Copy to clipboard", "Clear chat", "cancel"],
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === Number(0)) {
          copyToClipboard(text);
        }
        if (selectedIndex === 1) {
          clearChat();
        }
      }
    );
  }

  async function clearChat() {
    if (loading) return;

    setOpenaiResponse({
      messages: [],
      index: "0",
    });
    setOpenaiMessages([]);
  }

  function renderItem({ item, index }: { item: any; index: number }) {
    return (
      <View style={styles.promptResponse} key={index}>
        <View style={styles.promptTextContainer}>
          <View style={styles.promptTextWrapper}>
            <Text style={styles.promptText}>{item.user}</Text>
          </View>
        </View>
        {item.assistant && (
          <View style={styles.textStyleContainer}>
            <Markdown style={styles.markdownStyle as any}>
              {item.assistant}
            </Markdown>
            <TouchableHighlight
              onPress={() => showClipboardActionsheet(item.assistant)}
              underlayColor={"transparent"}
            >
              <View style={styles.optionsIconWrapper}>
                <Icon name="home" size={20} />
              </View>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }

  const callMade = (() => {
    return openaiResponse.messages.length > 0;
  })();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={110}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
        contentContainerStyle={!callMade && styles.scrollContentContainer}
      >
        {!callMade && (
          <View style={styles.midChatInputWrapper}>
            <View style={styles.midChatInputContainer}>
              <TextInput
                onChangeText={(v) => setInput(v)}
                style={styles.midInput}
                placeholder="Message"
                // placeholderTextColor={theme.placeholderTextColor}
                autoCorrect={true}
              />
              <TouchableHighlight onPress={chat} underlayColor={"transparent"}>
                <View style={styles.midButtonStyle}>
                  <Icon name="home" size={20} />
                  <Text style={styles.midButtonText}>
                    Start {chatType.name} Chat
                  </Text>
                </View>
              </TouchableHighlight>
              <Text style={styles.chatDescription}>
                Chat with a variety of different language models.
              </Text>
            </View>
          </View>
        )}
        {callMade && (
          <>
            {chatType.label.includes("gpt") && (
              <FlatList
                data={openaiResponse.messages}
                renderItem={renderItem}
                scrollEnabled={false}
              />
            )}
          </>
        )}
        {loading && <ActivityIndicator style={styles.loadingContainer} />}
      </ScrollView>
      {callMade && (
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(v) => setInput(v)}
            placeholder="Message"
            value={input}
          />
          <TouchableHighlight
            underlayColor={"transparent"}
            activeOpacity={0.65}
            onPress={chat}
          >
            <View style={styles.chatButton}>
              <Icon name="home" size={20} />
            </View>
          </TouchableHighlight>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    optionsIconWrapper: {
      padding: 10,
      paddingTop: 9,
      alignItems: "flex-end",
    },
    scrollContentContainer: {
      flex: 1,
    },
    chatDescription: {
      textAlign: "center",
      marginTop: 15,
      fontSize: 13,
      paddingHorizontal: 34,
      opacity: 0.8,
    },
    midInput: {
      marginBottom: 8,
      borderWidth: 1,
      paddingHorizontal: 25,
      marginHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 99,
    },
    midButtonStyle: {
      flexDirection: "row",
      marginHorizontal: 14,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 99,
      justifyContent: "center",
      alignItems: "center",
    },
    midButtonText: {
      marginLeft: 10,
      fontSize: 16,
    },
    midChatInputWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    midChatInputContainer: {
      width: "100%",
      paddingTop: 5,
      paddingBottom: 5,
    },
    loadingContainer: {
      marginTop: 25,
    },
    promptResponse: {
      marginTop: 10,
    },
    textStyleContainer: {
      borderWidth: 1,
      marginRight: 25,
      padding: 15,
      paddingBottom: 6,
      paddingTop: 5,
      margin: 10,
      borderRadius: 13,
    },
    promptTextContainer: {
      flex: 1,
      alignItems: "flex-end",
      marginRight: 15,
      marginLeft: 24,
    },
    promptTextWrapper: {
      borderRadius: 8,
      borderTopRightRadius: 0,
    },
    promptText: {
      paddingVertical: 5,
      paddingHorizontal: 9,
      fontSize: 16,
    },
    chatButton: {
      marginRight: 14,
      padding: 5,
      borderRadius: 99,
    },
    chatInputContainer: {
      paddingTop: 5,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 5,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 99,
      marginHorizontal: 10,
      paddingVertical: 10,
      paddingHorizontal: 21,
      paddingRight: 39,
    },
    container: {
      flex: 1,
    },
    markdownStyle: {
      paragraph: {
        fontSize: 16,
      },
      heading1: {
        marginVertical: 5,
      },
      heading2: {
        marginTop: 20,
        marginBottom: 5,
      },
      heading3: {
        marginTop: 20,
        marginBottom: 5,
      },
      heading4: {
        marginTop: 10,
        marginBottom: 5,
      },
      heading5: {
        marginTop: 10,
        marginBottom: 5,
      },
      heading6: {
        marginVertical: 5,
      },
      list_item: {
        marginTop: 7,
        fontSize: 16,
      },
      ordered_list_icon: {
        fontSize: 16,
      },
      bullet_list: {
        marginTop: 10,
      },
      ordered_list: {
        marginTop: 7,
      },
      bullet_list_icon: {
        fontSize: 16,
      },
      code_inline: {
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, .1)",
      },
      hr: {
        backgroundColor: "rgba(255, 255, 255, .1)",
        height: 1,
      },
      fence: {
        marginVertical: 5,
        padding: 10,
        borderColor: "rgba(255, 255, 255, .1)",
      },
      tr: {
        borderBottomWidth: 1,
        borderColor: "rgba(255, 255, 255, .2)",
        flexDirection: "row",
      },
      table: {
        marginTop: 7,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, .2)",
        borderRadius: 3,
      },
      blockquote: {
        backgroundColor: "#312e2e",
        borderColor: "#CCC",
        borderLeftWidth: 4,
        marginLeft: 5,
        paddingHorizontal: 5,
        marginVertical: 5,
      },
    } as any,
  });

export default Stats;
