import React from 'react';
import Input from '../ui/input';
import { ID, Segment } from './StartDiagram.types';
import produce from 'immer';
import { createSegmentId } from './helpers';
interface StarDiagramControlsProps {
  segments: Segment[];
  setSegments: React.Dispatch<React.SetStateAction<Segment[]>>
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

  const changeLabelOfSegment = (segmentKey: ID, newLabel: string) => {
    const updatedSegments = produce(segments, draft => {
      const index = draft.findIndex(seg => seg.key === segmentKey);
      if (index !== -1) draft[index].label = newLabel
    })
    setSegments(updatedSegments)
  }

  const changeValueOfSegment = (segmentKey: ID, newValue: string) => {
    let val = parseInt(newValue, 10)
    if (!val || val < 0){
      val = 0
    }
    const updatedSegments = produce(segments, draft => {
      const index = draft.findIndex(seg => seg.key === segmentKey);
      if (index !== -1) draft[index].value = val
    })
    setSegments(updatedSegments)
  }



  const addSegment = () => {
    const newSegment: Segment = {
      key: createSegmentId(),
      label: 'Change me',
      value: 0
    }
    const updatedSegments = produce(segments, draft => {
      draft.push(newSegment)
  })
    setSegments(updatedSegments)
  }

  const deleteSegment = (key: ID) => {
    const newSegments = produce(segments, draft => {
      const index = draft.findIndex(segment => segment.key === key)
      console.log('deleting index', index)
      if (index !== -1) draft.splice(index, 1)
    })
    setSegments(newSegments)
  }

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <Input value={levels} label={`Levels`} onChange={(e) => changeLevels(e.target.value)} inputType="number" key={`Value-Levels`} />

      </div>

      <div className="stack-l">
      {segments.map((segment, idx) => (
        <div className="flex flex-row controls-input">
        <div className="w-full stack-s mr-m">
        <Input value={segment.label} label={`Label`} onChange={(e) => changeLabelOfSegment(segment.key, e.target.value)} inputType="text" key={`Label-${segment.key}`} />
        <Input value={segment.value} label={`${segment.label} Value`} onChange={(e) => changeValueOfSegment(segment.key, e.target.value)} inputType="number" key={`Value-${segment.key}`} />
        </div>
        <button className="self-end ml-auto btn btn-destructive" onClick={() => deleteSegment(segment.key)}>
        DEL
        </button>
      </div>
      ))}
      </div>
      <button className="mt-8 btn controls-add" onClick={() => addSegment()}>
        + Add
      </button>
    </div>
  );
}

export default Controls;
