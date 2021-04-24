export type Coordinate = [x: number, y: number];

export interface PointObject {
  label: string;
  levelCoordinates: Coordinate[];
  textCoordinates: Coordinate;
}

export interface StarDiagramConfig {
  svgConfig: {
    width: number;
    height: number;
    padding: number;
    circleRadiusPercent: number;
  };
  debug: boolean;
  showCircle: boolean;
}
