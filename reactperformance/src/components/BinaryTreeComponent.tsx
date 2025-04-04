import React, { useLayoutEffect, useState } from "react";

// Komponent reprezentuj¹cy pojedynczy wêze³ drzewa
const BinaryTreeNode: React.FC<{ start: number; end: number; text: string; changeLeaves: (newText: string) => void, isRoot: boolean, rootText: string }> = ({
    start,
    end,
    text,
    changeLeaves,
    isRoot,
    rootText,
}) => {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const isLeaf = start === end;
    let content;
    if (isRoot)
        content = `${rootText} ${middle}`;
    else if (isLeaf)
        content = `${text} ${middle}`;
    else
        content = `Node ${middle}`;

    return (
        <div className="p-2 border rounded">
            <span>{content}</span>
            <div className="flex">
                <BinaryTreeNode start={start} end={middle - 1} text={text} changeLeaves={changeLeaves} rootText={rootText} isRoot={false} />
                <BinaryTreeNode start={middle + 1} end={end} text={text} changeLeaves={changeLeaves} rootText={rootText} isRoot={false} />
            </div>
        </div>
    );
};

export const BinaryTree: React.FC = () => {
    const [inputCount, setInputCount] = useState<number>(15);
    const [count, setCount] = useState<number>(15);
    const [leafText, setLeafText] = useState<string>("Node");
    const [renderTime, setRenderTime] = useState<number | null>(null);
    const [key, setKey] = useState<number>(0);
    const [rootText, setRootText] = useState<string>("Node");
    const [startTime, setStartTime] = useState<number | null>(null);

    useLayoutEffect(() => {
        if (startTime !== null) {
            setRenderTime(performance.now() - startTime);
            setStartTime(null);
        }
    }, [startTime]);

    const renderBinaryTree = () => {
        setStartTime(performance.now());
        setLeafText("Node");
        setRootText("Node");
        setCount(inputCount);
        setKey(prevKey => prevKey + 1);
    };

    const changeLeaves = (newText: string) => {
        const start = performance.now();
        setLeafText(newText);
        setTimeout(() => {
            setRenderTime(performance.now() - start);
        }, 0);
    };

    const changeRootText = (newText: string) => {
        const start = performance.now();
        setRootText(newText);
        setTimeout(() => {
            setRenderTime(performance.now() - start);
        }, 0);
    };

    const clearElements = () => {
        setInputCount(0);
        renderBinaryTree();
    }

    return (
        <div className="p-4">
            <h2 className="text-lg mb-4">Binary Tree Rendering</h2>
            <input
                type="number"
                value={inputCount}
                onChange={(e) => setInputCount(Number(e.target.value))}
                className="p-2 border rounded mr-2"
            />
            <button onClick={() => changeLeaves("Leaf")} className="p-2 bg-green-500 text-white rounded">
                Change Leaves
            </button>
            <button onClick={() => changeRootText("Root")} className="p-2 bg-green-500 text-white rounded">
                Change Root
            </button>
            <button onClick={() => clearElements()} className="p-2 bg-green-500 text-white rounded">
                Clear
            </button>
            <button onClick={renderBinaryTree} className="p-2 bg-blue-500 text-white rounded ml-2">
                Render
            </button>
            {renderTime !== null && <div>Render Time: {renderTime.toFixed(2)} ms</div>}
            <div className="mt-4">
                <BinaryTreeNode key={key} start={0} end={count - 1} text={leafText} changeLeaves={changeLeaves} rootText={rootText} isRoot={true} />
            </div>
        </div>
    );
};