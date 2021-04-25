import React, { useState } from 'react';
import StarDiagramRenderer from './Renderer';
import StarDiagramControls from "./Controls"
import {  Segment, StarDiagramConfig } from './StartDiagram.types';
import { createSegmentId } from './helpers';


interface StarDiagramProps {

}

const initialConfig: StarDiagramConfig = {
  svgConfig: {
    width: 800,
    height: 800,
    padding: 24,
    circleRadiusPercent: 0.3,
  },
  debug: true,
  showCircle: true
}

const initalSegments = [
  {key: createSegmentId(), label: 'change me', value: 2},
  {key: createSegmentId(), label: 'change me 2', value: 2},
  {key: createSegmentId(), label: 'tomato', value: 2},
  {key: createSegmentId(), label: 'tomato', value: 5},
  {key: createSegmentId(), label: 'potato', value: 0},
]


const StarDiagram: React.FC<StarDiagramProps> = () => {
  const [config, setConfig] = useState<StarDiagramConfig>(initialConfig)
  const [levels, setLevels] = useState<number>(5)
  const [segments, setSegments] = useState<Segment[]>(initalSegments)

  return (
    <div className="">
      <div className="relative items-start stack-l lg:flex-row">
      <div className="flex lg:sticky lg:top-m lg:left-0 lg:w-6/12 ">
      <StarDiagramRenderer segments={segments} levels={levels} config={config} />
      </div>
      <div className="w-full lg:max-w-lg controls lg:pl-12 lg:w-6/12">
        <h1 className="text-xl font-semibold text-skin-neutralLight mb-m">Spider Diagram</h1>
      <StarDiagramControls segments={segments} setSegments={setSegments} levels={levels} setLevels={setLevels} />
      </div>
      </div>
    </div>
  );
}

export default StarDiagram;
