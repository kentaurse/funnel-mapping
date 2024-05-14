import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import ReactFlow, {
  addEdge,
  Controls,
  ControlButton,
  Background,
  useNodesState,
  ReactFlowProvider,
  useEdgesState,
  useReactFlow,
  useStoreApi
} from "reactflow";
import Node from "./Node";
import "reactflow/dist/style.css";
import "src/assets/styles/Flow.css"
import { setRedo, setUndo, setDownloadCanvas, setInitialCanvas } from "src/redux/slices/PageSlice";
import { setConnecting } from "src/redux/slices/NodeSlice";
import NodeMenu from "src/components/menu/NodeMenu";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = { node: Node };
const panOnDrag = [1, 2];
const MIN_DISTANCE = 150;

const CanvasWind = () => {
  const dispatch = useDispatch();
  const store = useStoreApi();
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useReactFlow();
  const [instances, setInstances] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { isUndo, isRedo, selectFile, isDownloadCanvas, isInitialCanvas } = useSelector(state => state.page);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds));
  }, [setEdges]);

  const handleChange = async () => {
    if (redoStack.length !== 0) {
      setRedoStack([]);
    }
    save();
  };

  const save = useCallback(async () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      setInstances([...instances, flow]);
    }
    const _id = selectFile;
    const canvas = JSON.stringify(reactFlowInstance.toObject());
    await axios.put('/file', { _id, canvas });

  }, [instances, reactFlowInstance]);

  const undo = useCallback(() => {
    const restoreFlow = async () => {
      const instance = instances.at(-1);

      setInstances(() => {
        // pop (delete) the current react flow instance
        instances.pop();
        return instances;
      });

      const flow = instances.at(-1);

      if (flow) {
        setRedoStack([...redoStack, instance]);
        //const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        reactFlowInstance.setViewport(flow.viewport);
      } else {
        // save new init state
        save();
      }
    };

    restoreFlow();
  }, [reactFlowInstance, save, instances, redoStack, setNodes, setEdges]);

  const redo = useCallback(() => {
    const restoreFlow = async () => {
      const flow = redoStack.pop();

      if (flow) {
        setInstances([...instances, flow]);
        // redo stack without the val that was just popped
        setRedoStack(() => {
          return redoStack;
        });
        //const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        reactFlowInstance.setViewport(flow.viewport);
      }
    };

    restoreFlow();
  }, [reactFlowInstance, instances, redoStack, setNodes, setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const data = JSON.parse(event.dataTransfer.getData('text/plain'));

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });

    const id = uuidv4();

    const newNode = {
      id: id,
      type: 'node',
      position,
      data: {
        id: id,
        heading: data.alt,
        image: data.src,
        type: data.type,
        point: {
          right: [],
          bottom: [],
        },
        color: {
          right: [],
          bottom: [],
        },
        message: {
          content1: null,
          content2: null
        }
      }
    };

    setNodes((nds) => nds.concat(newNode));
  }

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === "z") {
      redo();
    } else if (e.ctrlKey && e.key === "y") {
      undo();
    }
  };

  useEffect(() => {
    if (isRedo) {
      redo();
      dispatch(setRedo(false));
    }
  }, [isRedo, redo, dispatch])

  useEffect(() => {
    if (isUndo) {
      undo();
      dispatch(setUndo(false));
    }
  }, [isUndo, undo, dispatch])

  useEffect(() => {
    const func = async () => {
      if (selectFile != null) {
        const items = (await axios.get('/file')).data;
        const canvasData = items.find(item => item._id === selectFile)?.canvas;
        if (typeof canvasData === 'string') {
          try {
            const flow = JSON.parse(canvasData);
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            reactFlowInstance.setViewport(flow.viewport);
          } catch (error) {
            console.error('Error parsing canvas data:', error);
          }
        } else {
          setNodes([]);
          setEdges([]);
        }
      } else {
        setNodes([]);
        setEdges([]);
      }
    };
    func();
  }, [selectFile, dispatch]);

  const downloadImage = (dataUrl) => {
    const width = 1322;
    const height = 850;
    const doc = new jsPDF({
      orientation: 'landscape', // Set orientation to landscape if necessary
      unit: 'px', // Use pixels as the unit
      format: [width, height] // Set the PDF size to match the image size
    });
    doc.addImage(dataUrl, "PNG", 0, 0, width, height);
    doc.save("canvas.pdf");

    dispatch(setDownloadCanvas(false));
  }

  const onConnectStart = () => {
    dispatch(setConnecting(true));
  }

  const onConnectEnd = () => {
    dispatch(setConnecting(false));
  }

  const getClosestEdge = useCallback((node) => {
    const { nodeInternals } = store.getState();
    const storeNodes = Array.from(nodeInternals.values());

    const closestNode = storeNodes.reduce(
      (res, n) => {
        if (n.id !== node.id) {
          const dx = n.positionAbsolute.x - node.positionAbsolute.x;
          const dy = n.positionAbsolute.y - node.positionAbsolute.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      {
        distance: Number.MAX_VALUE,
        node: null,
      },
    );

    if (!closestNode.node) {
      return null;
    }

    const closeNodeIsSource =
      closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

    return {
      id: closeNodeIsSource
        ? `${closestNode.node.id}-${node.id}`
        : `${node.id}-${closestNode.node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
    };
  }, []);

  const onNodeDrag = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        ) {
          closeEdge.className = 'temp';
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge, setEdges],
  );

  const onNodeDragStop = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        ) {
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
      handleChange();
    },
    [getClosestEdge],
  );

  useEffect(() => {
    if (isDownloadCanvas) {
      toPng(document.querySelector(".reactflow-wrapper"), {
        style: {
          transform: "translate(0, 0) scale(1)"
        }
      }).then(downloadImage);
    }
  }, [isDownloadCanvas, dispatch])

  useEffect(() => {
    if (isInitialCanvas) {
      setNodes([]);
      setEdges([]);
      dispatch(setInitialCanvas(false));
    }
  }, [isInitialCanvas, dispatch])

  return (
    <div className="w-full h-[850px]">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onInit={save}
          onDragOver={onDragOver}
          onEdgesDelete={handleChange}
          onNodesDelete={handleChange}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onConnectEnd={onConnectEnd}
          onConnectStart={onConnectStart}
          onConnect={(e) => {
            onConnect(e);
            handleChange();
          }}
          onDrop={(e) => {
            onDrop(e);
            handleChange();
          }}
          fitView
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          attributionPosition="top-right"
        >
          <Background gap={16} />
          <Controls className="flex">
            <ControlButton onClick={undo} className="text-black">↻</ControlButton>
            <ControlButton onClick={redo} className="text-black">↺</ControlButton>
          </Controls>
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => {
  const { nodeMenu } = useSelector(state => state.page);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    if (nodeMenu.flag) {
      contextMenuRef.current.focus();
    }
  });

  return (
    <div className="dndflow relative">
      {nodeMenu.flag && <NodeMenu top={nodeMenu.y - 95} left={nodeMenu.x - 594} nodeRef={contextMenuRef} />}
      <ReactFlowProvider>
        <CanvasWind />
      </ReactFlowProvider>
    </div>
  );
}
