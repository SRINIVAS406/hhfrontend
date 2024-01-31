import React, { useState, useCallback, useEffect } from 'react';
import Tree from 'react-d3-tree';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Orgtree.css'



const OrganizationTree = () => {
  const [treeData, setTreeData] = useState({
    name: 'CEO',
    children: [
      {
        name: 'Manager 1',
        children: [
          {
            name: 'Employee 1.1',
            children: [
                
              ]
          },
          {
            name: 'Employee 1.2'
          }
        ]
      },
      {
        name: 'Manager 2',
        children: [
          {
            name: 'Employee 2.1',
            children: [
                
              ]
          },
          {
            name: 'Employee 2.2'
          }
        ]
      }
    ]
  });

  const [users, setUsers] = useState([]);
    useEffect(() => {
        // Fetch the list of users and set it to the users state
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

        if (token) {
        axios
            .get('https://hhbackend.vercel.app/getTreeUsers', {
                headers: {
                  Authorization: `${token}`
                }
              })
            .then((response) => {
                setTreeData(response.data);
                console.log("Srinivas--: ",treeData);
            })
            .catch((error) => console.error(error));
        }
    }, []);

  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState({ x: window.innerWidth / 2, y: 50 });
  const [zoom, setZoom] = useState(1);

  const onNodeClick = useCallback((nodeData) => {
    setLoading(true);
    setSelectedNode(nodeData);

  }, []);

  const onZoom = useCallback(({ translate, scale }) => {
    setTranslate(translate);
    setZoom(scale);
  }, []);

  const handleClose = () => {
    setSelectedNode(null);
  };

  // Custom node rendering function
  const renderCustomNode = ({ nodeDatum, toggleNode }) => {
    // console.log('hi-',nodeDatum);
    if (!nodeDatum) {
      return null; // or handle accordingly
    }

    const handleNodeClick = () => {
      onNodeClick(nodeDatum);
    };

    let name = nodeDatum.name && nodeDatum.name.length>15 ? nodeDatum.name.slice(0,15)+'...':nodeDatum.name;
    let job = nodeDatum.job && nodeDatum.job.length>15 ? nodeDatum.job.slice(0,15)+'...':nodeDatum.job;
    // Use the default coordinates provided by the library
    const x = nodeDatum.x ?? 0;
  const y = nodeDatum.y ?? 0;



    return <>
    <g>
    {/* Background rectangle */}
    <rect
      x={x-75}
      y={y}
      width="150"
      height="60"
      fill="#f0f0f0"
      rx="10"
      // onClick={handleNodeClick}
      style={{ cursor: 'pointer' }}
    />
    {/* Text content */}
    <text x={x} y={y + 20} fill="#333"  textAnchor="middle"  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
>
    <tspan x={x} fontWeight='bold'title={`Name: ${nodeDatum.name}}`}>{name}</tspan>
        <tspan x={x} dy="1.2em" fontSize="12" title={`Job: ${nodeDatum.job}`}>{job}</tspan>
    </text>
    <rect
        x={x - 60}
        y={y + 50} 
        width="120"
        height="20"
        fill="#ccc"
        rx="5"
        onClick={handleNodeClick}
        style={{ cursor: 'pointer' }}
      />
      <text
        x={x}
        y={y + 65} 
        fill="#333"
        textAnchor="middle"
        style={{ cursor: 'pointer' }}
        onClick={handleNodeClick}
      >
        Show Details
      </text>

    {/* Clip path for profile picture */}
    <defs>
  <clipPath id={`profileClip-${nodeDatum.id}`}>
    <circle cx={x} cy={y - 15} r="20" />
  </clipPath>
</defs>
  </g>
  </>};

  // Helper function to add ids to the tree data
  const addIdsToTree = (node, idPrefix = '') => {
    const id = idPrefix + node.name.toLowerCase().replace(/\s+/g, '-');
    node.id = id;

    if (node.children) {
      node.children.forEach((child, index) => {
        addIdsToTree(child, `${id}-${index + 1}`);
      });
    }
  };

  // Call the helper function when setting the initial tree data
  useEffect(() => {
    addIdsToTree(treeData);
  }, []);

  useEffect(() => {
    // Set the app element for accessibility
    Modal.setAppElement('#profileCard'); // Replace with the actual app element selector
  }, []);

  const handleResetZoom = () => {
    setTranslate({ x: window.innerWidth / 2, y: 50 });
    setZoom(1);
  };

  return (
    <div style={{ width: '95vw', height: '100vh', padding: '10px', background: '#d4d5d1', margin:'auto', borderRadius:'10px' }}>
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-secondary" onClick={handleResetZoom}>
          Reset Zoom
        </button>
      </div>  
      <Tree
        data={treeData}
        orientation="vertical"
        translate={translate}
        zoom={zoom}
        onNodeClick={onNodeClick}
        onZoom={onZoom}
        separation={{ siblings: 2, nonSiblings: 2 }}
        nodeSize={{ x: 140, y: 100 }}
        pathFunc="diagonal"
        transitionDuration={1000}
        renderCustomNodeElement={renderCustomNode}
      />

        <div id="profileCard">
        <Modal
        isOpen={!!selectedNode}
        onRequestClose={handleClose}
        
        contentLabel="User Details"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            maxWidth: '400px',
            width: '100%',
            height:'70%'
          },
        }}
      >
        <h2>User Details</h2>
        {selectedNode && (
          <>
            <p><b>Name:</b> {selectedNode.name}</p>
            <p><b>Email:</b> {selectedNode.email}</p>
            <p><b>Job:</b> {selectedNode.job}</p>
            <p><b>Company Name:</b> {selectedNode.companyname}</p>
            <p><b>About:</b> {selectedNode.about}</p>
            <p><b>Skill:</b> {selectedNode.skill}</p>
          </>
        )}
        <button onClick={handleClose} className="btn btn-primary">Close</button>
      </Modal>
        </div>
      
    </div>
  );
};

export default OrganizationTree;