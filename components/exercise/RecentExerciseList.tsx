import { FlatList } from "react-native";

import SquareCard from "@/components/exercise/SquareCard";
import { Exercise } from "@/lib/types";

interface RecentListProps {
  data: Exercise[];
}

const RecentList = ({ data }: RecentListProps) => {
  return (
    <FlatList
      className="pl-6 space-x-2"
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <SquareCard exercise={item} />}
      contentOffset={{ x: 0, y: 0 }}
      horizontal
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RecentList;
