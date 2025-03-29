import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
    <div className="p-4">
        <h1 className="text-xl mb-4">React Performance Benchmark</h1>
        <div className="flex gap-2 mb-4">
            <Link to="/static-elements">Static elements</Link>
            <Link to="/child-components">Parent component</Link>
            <Link to="/binary-tree">Binary tree</Link>
        </div>
    </div>
);

export default Home;