import React, { useLayoutEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

export const StaticElements: React.FC = () => {
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [renderTime, setRenderTime] = useState<number | null>(null);
    const [count, setCount] = useState<number>(1000);
    const [startTime, setStartTime] = useState<number | null>(null);

    useLayoutEffect(() => {
        if (startTime !== null) {
            setRenderTime(performance.now() - startTime);
            setStartTime(null);
        }
    }, [startTime]);

    const renderStaticElements = () => {
        setStartTime(performance.now());
        const elements = Array.from({ length: count }, (_, i) => <div>Simple component {i}</div>);
        setElements(elements);
    };

    const clearElements = () => {
        setCount(0);
        renderStaticElements();
    }

    return (
        <div className="p-4">
            <h2 className="text-lg mb-4">Static Elements Rendering</h2>
            <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="p-2 border rounded mr-2"
            />
            <button onClick={clearElements} className="p-2 bg-blue-500 text-white rounded">
                Clear
            </button>
            <button onClick={renderStaticElements} className="p-2 bg-blue-500 text-white rounded">
                Render
            </button>
            {renderTime && <div>Render Time: {renderTime.toFixed(2)} ms</div>}
            <div className="grid grid-cols-5 gap-2 mt-4">{elements}</div>
        </div>
    );
};