import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  Line,
  Circle,
} from "react-native-svg";

const CURRENT_MONTH = new Date().getMonth(); // 0-indexed

const PAGES = [
  {
    months: ["Jan", "Feb", "Mar", "Apr", "May"],
    monthIndices: [0, 1, 2, 3, 4],
    values: [55, 35, 65, 30, 70, 25, 60, 45, 80, 50],
  },
  {
    months: ["May", "June", "July", "Aug", "Sep"],
    monthIndices: [4, 5, 6, 7, 8],
    values: [50, 40, 78, 35, 55, 60, 30, 50, 45, 40],
  },
  {
    months: ["Sep", "Oct", "Nov", "Dec", "Jan"],
    monthIndices: [8, 9, 10, 11, 0],
    values: [45, 60, 40, 75, 50, 35, 65, 55, 30, 60],
  },
];

function buildSmoothPath(values, width, height) {
  const padTop = 18;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * width,
    y: padTop + (height - padTop) * 0.82 * (1 - (v - min) / range),
  }));

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return { linePath: d, fillPath: `${d} L ${width} ${height} L 0 ${height} Z`, pts };
}

// Get Y on the smooth curve at a given X using the precomputed points (linear interp between segments)
function getYAtX(pts, targetX) {
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i + 1];
    if (targetX >= p1.x && targetX <= p2.x) {
      const t = (targetX - p1.x) / (p2.x - p1.x);
      return p1.y + t * (p2.y - p1.y);
    }
  }
  return pts[pts.length - 1].y;
}

export default function ProgressGraph() {
  const { width } = useWindowDimensions();
  const [activePage, setActivePage] = useState(0);
  const flatListRef = useRef(null);
  const CHART_HEIGHT = 170;

  const goToPage = (index) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActivePage(index);
  };

  const renderGraph = ({ item }) => {
    const { fillPath, pts } = buildSmoothPath(item.values, width, CHART_HEIGHT);

    // Find which column index (0-4) is the current month
    const currentColIndex = item.monthIndices.indexOf(CURRENT_MONTH);
    const hasCurrentMonth = currentColIndex !== -1;

    // X position of current month label column
    const currentX = hasCurrentMonth
      ? (currentColIndex / (item.months.length - 1)) * width
      : null;

    // Y on the curve at that X
    const currentY = hasCurrentMonth ? getYAtX(pts, currentX) : null;

    // Grid lines at each month position except first and last
    const gridXs = item.months.map((_, i) => (i / (item.months.length - 1)) * width);

    return (
      <View style={{ width }}>
        <Svg width={width} height={CHART_HEIGHT}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#C4AEFF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#C4AEFF" stopOpacity="0" />
            </LinearGradient>
          </Defs>

          {/* Grid lines — skip edges */}
          {gridXs.slice(1, -1).map((x, i) => (
            <Line
              key={i}
              x1={x} y1={0}
              x2={x} y2={CHART_HEIGHT}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1"
            />
          ))}

          {/* Filled area */}
          <Path d={fillPath} fill="url(#grad)" />

          {/* Current month dot on curve */}
          {hasCurrentMonth && (
            <>
              {/* Outer purple ring */}
              <Circle
                cx={currentX}
                cy={currentY}
                r={9}
                fill="#BCA6FF"
              />
              {/* Inner white fill */}
              <Circle
                cx={currentX}
                cy={currentY}
                r={5.5}
                fill="white"
              />
            </>
          )}
        </Svg>

        {/* Month labels */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            marginTop: 8,
          }}
        >
          {item.months.map((m, i) => {
            const isCurrent = item.monthIndices[i] === CURRENT_MONTH;
            return (
              <Text
                key={m}
                style={{
                  fontSize: 12,
                  color: isCurrent ? "#374151" : "#9CA3AF",
                  fontWeight: isCurrent ? "700" : "400",
                  width: 36,
                  textAlign: "center",
                }}
              >
                {m}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={PAGES}
        renderItem={renderGraph}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const page = Math.round(e.nativeEvent.contentOffset.x / width);
          setActivePage(page);
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
        {PAGES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => goToPage(i)} hitSlop={10}>
            <View
              style={{
                width: activePage === i ? 24 : 8,
                height: 8,
                borderRadius: 99,
                backgroundColor: activePage === i ? "#BCA6FF" : "#E5E7EB",
                marginHorizontal: 3,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}