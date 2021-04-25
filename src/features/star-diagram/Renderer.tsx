import React from 'react';
import type { Coordinate, PointObject, Segment, StarDiagramConfig } from './StartDiagram.types';

interface StarDiagramRendererProps {
  segments: Segment[];
  levels: number;
  config: StarDiagramConfig;
}

const StarDiagramRenderer: React.FC<StarDiagramRendererProps> = ({segments, levels, config}) => {

  const centerCoordinates =  [config.svgConfig.width / 2, config.svgConfig.height / 2];
  const radius = config.svgConfig.width * config.svgConfig.circleRadiusPercent;
  const outerBoxWidth = config.svgConfig.width + config.svgConfig.padding * 2
  const outerBoxHeight = config.svgConfig.height + config.svgConfig.padding * 2

  const createPolygon = (coordinates: Coordinate[], centerPoint: Coordinate, fill?: boolean) => {
    return (
      <polygon points={coordinates.reduce((final, coord) => final.concat(`${coord[0]}, ${coord[1]}`), [] as string[]).join(' ')} x={centerPoint[0]} y={centerPoint[1]} fill={fill? 'currentColor' : 'none'} stroke="currentColor" className="c-fg" key={`polygon-${coordinates.join('-')}`} />
    )
  }

  const createPointObject = (segment: Segment, index: number, levels: number): PointObject => {
    const levelRadiusPart = radius / levels;
    const levelCoordinates = Array.from(Array(levels)).map((level, levelIdx) => {
      return [calcXOnCircle(index, (levelIdx + 1) *  levelRadiusPart), calcYOnCircle(index, (levelIdx + 1) *  levelRadiusPart)] as Coordinate
    })
    const textCoordinates = [calcXOnCircle(index, (levels+1) *  levelRadiusPart), calcYOnCircle(index, (levels + 1) *  levelRadiusPart)] as Coordinate

    const valueCoordinates = [calcXOnCircle(index, (segment.value) *  levelRadiusPart), calcYOnCircle(index, (segment.value) *  levelRadiusPart)] as Coordinate


    return {
      label: segment.label,
      levelCoordinates,
      textCoordinates,
      value: segment.value,
      valueCoordinates
    }
  }

  const calcXOnCircle = (idx: number, radius: number): number => {
    // convert degrees to radians: * PI / 180
    const x = (360 / segments.length * idx - 90) * Math.PI / 180;

    // get x on circle: x = cx + r * cos(a)
    return centerCoordinates[0] + radius * Math.cos(x)

  }

  const calcYOnCircle = (idx: number, radius: number): number => {
    const x = (360 / segments.length * idx - 90)  * Math.PI / 180;

    // get y on circle:  y = cy + r * sin(a)
    return centerCoordinates[1] + radius * Math.sin(x)
    }

  const allSegments = segments.map((seg, index) => createPointObject(seg, index, levels))

  const levelPolygons = Array.from(Array(levels)).map((level, levelIdx) => {
    const levelCoordinates = allSegments.map(seg => seg.levelCoordinates[levelIdx])
    return createPolygon(levelCoordinates, [centerCoordinates[0], centerCoordinates[1]], false)
  })

  const valuePolygonCoordinates = allSegments.map(seg => seg.valueCoordinates);
  const valuePolygon = createPolygon(valuePolygonCoordinates, [centerCoordinates[0], centerCoordinates[1]], true)


  return (
    <div className="w-full renderer">
     <svg className="border-2 bg-skin-mutedDark text-skin-neutral border-skin-neutralDark" viewBox={`0 0 ${outerBoxWidth} ${outerBoxHeight}`}>
       <svg className="graph-container" x={config.svgConfig.padding} y={config.svgConfig.padding} width={config.svgConfig.width} height={config.svgConfig.height} viewBox={`0 0 ${config.svgConfig.width} ${config.svgConfig.height}`}>
         {config.debug && <g className="debug">
         <rect x={0} y={0} width={config.svgConfig.padding} height={config.svgConfig.padding} className="debug-rect" />
         <rect x={config.svgConfig.width - config.svgConfig.padding} y={0} width={config.svgConfig.padding} height={config.svgConfig.padding} className="debug-rect" />
         <rect x={config.svgConfig.width - config.svgConfig.padding} y={config.svgConfig.height - config.svgConfig.padding} width={config.svgConfig.padding} height={config.svgConfig.padding} className="debug-rect" />
         <rect x={0} y={config.svgConfig.height - config.svgConfig.padding} width={config.svgConfig.padding} height={config.svgConfig.padding} className="debug-rect" />
         </g> }

         {config.showCircle && (<g>
           <circle cx={centerCoordinates[0]} cy={centerCoordinates[1]} r={radius} fill="none" stroke="currentColor" className="c-fg" />

         </g>)}
         <g>
           {levelPolygons.map(poly => (
             poly
           ))}
           {allSegments.map((seg) => (
             <g key={`segment-${seg.label}-line-text`}>
            <text className="c-fg" x={seg.textCoordinates[0]} y={seg.textCoordinates[1]} style={{transform: 'translate(-50%, 0)', transformBox: 'fill-box', transformOrigin: 'center center'}}>{seg.label}</text>
             <line x1={centerCoordinates[0]} y1={centerCoordinates[1]} x2={seg.levelCoordinates[seg.levelCoordinates.length-1][0]} y2={seg.levelCoordinates[seg.levelCoordinates.length-1][1]} stroke='currentColor' className="c-fg" />
             </g>
           ))}
           {valuePolygon}
         </g>


       </svg>
     </svg>
     </div>
  );
}

export default StarDiagramRenderer;
