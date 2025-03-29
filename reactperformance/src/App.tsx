import './App.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { StaticElements } from './components/SimpleComponent';
import { ParentComponent } from './components/ParentComponent';
import { BinaryTree } from './components/BinaryTreeComponent';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/static-elements" element={<StaticElements />} />
            <Route path="/child-components" element={<ParentComponent />} />
            <Route path="/binary-tree" element={<BinaryTree />} />
        </Routes>
    </Router>
);

export default App;
