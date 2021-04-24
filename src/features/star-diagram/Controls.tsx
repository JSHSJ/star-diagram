import React from 'react';
import Input from '../ui/input';

interface StarDiagramControlsProps {
  segments: string[];
  setSegments: React.Dispatch<React.SetStateAction<string[]>>
  levels: number;
  setLevels: React.Dispatch<React.SetStateAction<number>>
}

const Controls: React.FC<StarDiagramControlsProps> = ({segments, setSegments, levels, setLevels}) =>{

  const changeLevels = (newLevels: string) => {
    const parsedLevels = parseInt(newLevels, 10);

    if (!parsedLevels || parsedLevels <= 0){
      setLevels(1)
    } else {
      setLevels(parsedLevels)
    }
  }


  const updateValueInSegments = (newVal: string, idx: number) => {
    const newSegments = Object.assign([], segments, {[idx]: newVal})
    setSegments(newSegments)
  }

  const addSegment = () => {
    const newSegments = segments.concat('')
    setSegments(newSegments)

  }

  const deleteSegment = (idx: number) => {
    const newSegments = segments.filter((val, index) => index !== idx)
    setSegments(newSegments)
  }

  return (
    <div className="controls flex flex-col">
      <div className="mb-8">
        <Input value={levels} label={`Levels`} onChange={(e) => changeLevels(e.target.value)} inputType="number" key={`Value-Levels`} />

      </div>

      <div className="flex flex-col space-y-4">
      {segments.map((segment, idx) => (
        <div className="controls-input flex flex-row">
        <div className="mr-4 w-full">
        <Input value={segment} label={`Value-${idx}`} onChange={(e) => updateValueInSegments(e.target.value, idx)} inputType="text" key={`Value-${idx}`} />
        </div>
        <button className="controls-delete ml-auto border-2 border-skin-neutral p-2 self-end hover:bg-skin-mutedLight" onClick={() => deleteSegment(idx)}>
        DEL
        </button>
      </div>
      ))}
      </div>
      <button className="controls-add border-2 border-skin-neutral hover:bg-skin-mutedLight mt-8 p-2" onClick={() => addSegment()}>
        + Add
      </button>
    </div>
  );
}

export default Controls;
