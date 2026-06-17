import { useRef, useMemo } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import {LegendList} from "@legendapp/list/react-native";

type Item = { id: string; label: string; value: number };

function generateItems(count: number): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i),
    label: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
  }));
}

const ITEMS = generateItems(100);

function ListItem({ item }: { item: Item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{item.label}</Text>
      <Text style={styles.itemValue}>{item.value}</Text>
    </View>
  );
}

function ListFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Footer — end of list</Text>
    </View>
  );
}

export default function Index() {
  const sheetRef = useRef<TrueSheet>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => sheetRef.current?.present()}>
        <Text style={styles.buttonText}>Open Sheet</Text>
      </TouchableOpacity>

      <TrueSheet ref={sheetRef} sizes={["large"]} cornerRadius={24}>
        <LegendList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem item={item} />}
          estimatedItemSize={56}
          contentContainerStyle={styles.listContent}
        />
        <ListFooter/>
      </TrueSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  itemLabel: {
    fontSize: 15,
    color: "#111",
  },
  itemValue: {
    fontSize: 15,
    color: "#888",
    fontVariant: ["tabular-nums"],
  },
  footer: {
    marginTop: 16,
    paddingVertical: 20,
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    fontSize: 13,
    color: "#aaa",
  },
});