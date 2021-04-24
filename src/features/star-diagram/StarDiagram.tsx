import React, { useState } from 'react';
import StarDiagramRenderer from './Renderer';
import StarDiagramControls from "./Controls"
import {  StarDiagramConfig } from './StartDiagram.types';


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


const StarDiagram: React.FC<StarDiagramProps> = () => {
  const [config, setConfig] = useState<StarDiagramConfig>(initialConfig)
  const [levels, setLevels] = useState<number>(5)
  const [segments, setSegments] = useState<string[]>(['Langer Text', '2', '3', '4', '5', '6', '7'])

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row">
      <div className="renderer flex lg:w-6/12 xl:w-8/12">
      <StarDiagramRenderer segments={segments} levels={levels} config={config} />
      </div>
      <div className="controls lg:pl-12 lg:w-6/12 xl:w-4/12">
      <StarDiagramControls segments={segments} setSegments={setSegments} levels={levels} setLevels={setLevels} />
      </div>
      </div>
    </div>
  );
}

export default StarDiagram;
