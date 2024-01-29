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
                {
                  name: 'Employee 1.3'
                },
                {
                  name: 'Employee 1.6',
                  children: [
                    {
                      name: 'Employee 1.11'
                    },
                    {
                      name: 'Employee 1.21',
                      children: [
                        {
                          name: 'Employee 1.112'
                        },
                        {
                          name: 'Employee 1.212',
                          children: [
                            {
                              name: 'Employee 1.1133'
                            },
                            {
                              name: 'Employee 1.2122',
                              children: [
                                {
                                  name: 'Employee 1.1561'
                                },
                                {
                                  name: 'Employee 1.2661'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
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
                {
                  name: 'Employee 1.5'
                },
                {
                  name: 'Employee 1.4',
                  children: [
                    {
                      name: 'Employee 1.18'
                    },
                    {
                      name: 'Employee 1.29',
                      children: [
                        {
                          name: 'Employee 1.132'
                        },
                        {
                          name: 'Employee 1.232',
                          children: [
                            {
                              name: 'Employee 1.122'
                            },
                            {
                              name: 'Employee 1.221',
                              children: [
                                {
                                  name: 'Employee 1.1881'
                                },
                                {
                                  name: 'Employee 1.2881'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
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
            .get('http://localhost:3001/getTreeUsers', {
                headers: {
                  Authorization: `${token}`
                }
              })
            .then((response) => {
                setTreeData(response.data);
                console.log("Srinivas: ",treeData);
            })
            .catch((error) => console.error(error));
        }
    }, []);

  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState({ x: window.innerWidth / 2, y: 50 });
  const [zoom, setZoom] = useState(1);

  const onNodeClick = useCallback((nodeData) => {
    console.log('Node Clicked:', nodeData);
    setLoading(true);
    console.log("NodeData---"+nodeData);
    // Simulate an asynchronous operation
    setSelectedNode(nodeData);
    
  }, []);

  const onZoom = useCallback(({ translate, scale }) => {
    setTranslate(translate);
    setZoom(scale);
  }, []);

  const handleClose = () => {
    setSelectedNode(null);
  };

  // Helper function to add ids to the tree data
  const addIdsToTree = (node, idPrefix = '') => {
    const id = idPrefix + node.name.toLowerCase().replace(/\s+/g, '-');
    node.id = id;

    // if (node.children) {
    //   node.children.forEach((child, index) => {
    //     addIdsToTree(child, `${id}-${index + 1}`);
    //   });
    // }
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

  return (
    <div style={{ width: '95vw', height: '100vh', padding: '10px', background: '#d4d5d1', margin:'30px', borderRadius:'10px' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={translate}
        zoom={zoom}
        onNodeClick={onNodeClick}
        onZoom={onZoom}
        separation={{ siblings: 2, nonSiblings: 2 }}
        nodeSize={{ x: 140, y: 70 }}
        pathFunc="diagonal"
        transitionDuration={10000}
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
            height:'100%'
          },
        }}
      >
        <h2>User Details</h2>
        {selectedNode && (
          <>
            <p><b>Name:</b> {selectedNode.data.name}</p>
            <p><b>Email:</b> {selectedNode.data.email}</p>
            <p><b>Parent ID:</b> {selectedNode.data.parentId}</p>
            <p><b>Job:</b> {selectedNode.data.job}</p>
            <p><b>Company Name:</b> {selectedNode.data.companyname}</p>
            <p><b>About:</b> {selectedNode.data.about}</p>
            <p><b>Skill:</b> {selectedNode.data.skill}</p>
          </>
        )}
        <button onClick={handleClose}>Close</button>
      </Modal>
        </div>
      
    </div>
  );
};

export default OrganizationTree;