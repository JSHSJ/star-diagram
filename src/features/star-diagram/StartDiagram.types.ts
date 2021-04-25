export type Coordinate = [x: number, y: number];

export type ID = string | number;
export interface Segment {
  label: string;
  key: ID;
  value: number;
}

export interface PointObject {
  label: string;
  levelCoordinates: Coordinate[];
  textCoordinates: Coordinate;
  textTransform: number[];
  value: number;
  valueCoordinates: Coordinate;
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
