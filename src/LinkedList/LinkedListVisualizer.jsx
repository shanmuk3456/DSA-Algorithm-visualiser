import VisualizerPageHeader from "../components/VisualizerPageHeader";
import { useState } from "react";
import "../Array/array.css";
import "./LinkedList.css";

function cloneList(arr) {
  return arr.map((node) => ({ ...node }));
}

function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const [originalList, setOriginalList] = useState([]);

  const [previewStep, setPreviewStep] = useState(null);

  const [controlsVisible, setControlsVisible] = useState(false);

  const [inputMode, setInputMode] = useState(null);

  const [valueInput, setValueInput] = useState("");
  const [positionInput, setPositionInput] = useState("");

  const [stepDesc, setStepDesc] = useState("");
  const [note, setNote] = useState("");

  const [highlights, setHighlights] = useState([]);
  const [displayOutput, setDisplayOutput] = useState("");

  const [opsVisible, setOpsVisible] = useState(false);
  const [showOutputBox, setShowOutputBox] = useState(false);


  function pushStep(
  arr,
  hl = [],
  desc = "",
  output = ""
) {
  return {
    list: cloneList(arr),
    highlights: [...hl],
    desc,
    output
  };
}

  function startOperation(generatedSteps) {
    setOriginalList(cloneList(list));

    setSteps(generatedSteps);

    setStepIndex(0);

    setPreviewStep(generatedSteps[0]);

    setControlsVisible(true);

    setStepDesc(generatedSteps[0]?.desc || "");
  }

  function getView() {
    if (previewStep) {
      return previewStep;
    }

    return {
      list,
      highlights,
    };
  }

  function handleCreate() {
  setList([]);

  setSteps([]);

  setStepIndex(0);

  setPreviewStep(null);

  setControlsVisible(false);

  setInputMode(null);

  setStepDesc("");

  setDisplayOutput("");

  setOpsVisible(true);
  setShowOutputBox(false);

  setNote("Linked List created. Start inserting nodes.");
}

  /* ==========================
      INSERT BEGINNING
     ========================== */

  function handleInsertBeginning() {
    setShowOutputBox(false);
    const value = valueInput.trim();

    if (!value) {
      alert("Enter a value");
      return;
    }

    const generated = [];

    generated.push(
      pushStep(
        list,
        [],
        `Creating new node with value ${value}`
      )
    );

    const newList = [
      { value },
      ...cloneList(list),
    ];

    generated.push(
      pushStep(
        newList,
        [0],
        `New node becomes HEAD`
      )
    );

    startOperation(generated);
  }

  /* ==========================
      INSERT END
     ========================== */

  function handleInsertEnd() {
    setShowOutputBox(false);
    const value = valueInput.trim();

    if (!value) {
      alert("Enter a value");
      return;
    }

    const generated = [];

    generated.push(
      pushStep(
        list,
        [],
        `Creating new node with value ${value}`
      )
    );

    if (list.length === 0) {
      generated.push(
        pushStep(
          [{ value }],
          [0],
          `List empty. Node becomes HEAD`
        )
      );
    } else {
      for (let i = 0; i < list.length; i++) {
        generated.push(
          pushStep(
            list,
            [i],
            `Traversing node ${list[i].value}`
          )
        );
      }

      const newList = [
        ...cloneList(list),
        { value },
      ];

      generated.push(
        pushStep(
          newList,
          [newList.length - 1],
          `Inserted ${value} at tail`
        )
      );
    }

    startOperation(generated);
  }

  /* ==========================
      INSERT POSITION
     ========================== */

  function handleInsertPosition() {
    setShowOutputBox(false);
    const value = valueInput.trim();

    const pos = parseInt(positionInput);

    if (!value) {
      alert("Enter value");
      return;
    }

    if (
      isNaN(pos) ||
      pos < 1 ||
      pos > list.length + 1
    ) {
      alert("Invalid Position");
      return;
    }

    const generated = [];

    generated.push(
      pushStep(
        list,
        [],
        `Insert ${value} at position ${pos}`
      )
    );

    if (pos === 1) {
      const newList = [
        { value },
        ...cloneList(list),
      ];

      generated.push(
        pushStep(
          newList,
          [0],
          `Inserted at head`
        )
      );

      startOperation(generated);

      return;
    }

    for (let i = 0; i < pos - 1; i++) {
      generated.push(
        pushStep(
          list,
          [i],
          `Traversing node ${list[i].value}`
        )
      );
    }

    const newList = cloneList(list);

    newList.splice(
      pos - 1,
      0,
      { value }
    );

    generated.push(
      pushStep(
        newList,
        [pos - 1],
        `Inserted ${value} at position ${pos}`
      )
    );

    startOperation(generated);
  }
    /* ==========================
      DELETE BEGINNING
     ========================== */

  function handleDeleteBeginning() {
    setShowOutputBox(false);
    const generated = [];

    if (list.length === 0) {
      generated.push(
        pushStep(
          list,
          [],
          "List is empty. Nothing to delete."
        )
      );

      startOperation(generated);
      return;
    }

    generated.push(
      pushStep(
        list,
        [0],
        `HEAD node ${list[0].value} selected`
      )
    );

    const newList = cloneList(list);

    newList.shift();

    generated.push(
      pushStep(
        newList,
        [0],
        "HEAD moved to next node"
      )
    );

    startOperation(generated);
  }

  /* ==========================
      DELETE END
     ========================== */

  function handleDeleteEnd() {
    setShowOutputBox(false);
    const generated = [];

    if (list.length === 0) {
      generated.push(
        pushStep(
          list,
          [],
          "List is empty."
        )
      );

      startOperation(generated);
      return;
    }

    if (list.length === 1) {
      generated.push(
        pushStep(
          list,
          [0],
          `Deleting node ${list[0].value}`
        )
      );

      generated.push(
        pushStep(
          [],
          [],
          "List becomes empty"
        )
      );

      startOperation(generated);
      return;
    }

    for (let i = 0; i < list.length; i++) {
      generated.push(
        pushStep(
          list,
          [i],
          `Traversing node ${list[i].value}`
        )
      );
    }

    const newList = cloneList(list);

    newList.pop();

    generated.push(
      pushStep(
        newList,
        [newList.length - 1],
        "Tail deleted"
      )
    );

    startOperation(generated);
  }

  /* ==========================
      DELETE POSITION
     ========================== */

  function handleDeletePosition() {
    setShowOutputBox(false);
    const pos = parseInt(positionInput);

    if (
      isNaN(pos) ||
      pos < 1 ||
      pos > list.length
    ) {
      alert("Invalid Position");
      return;
    }

    const generated = [];

    generated.push(
      pushStep(
        list,
        [],
        `Delete node at position ${pos}`
      )
    );

    for (let i = 0; i < pos; i++) {
      generated.push(
        pushStep(
          list,
          [i],
          `Traversing node ${list[i].value}`
        )
      );
    }

    const newList = cloneList(list);

    newList.splice(pos - 1, 1);

    generated.push(
      pushStep(
        newList,
        [],
        `Node at position ${pos} deleted`
      )
    );

    startOperation(generated);
  }

  /* ==========================
      SEARCH
     ========================== */

  function handleSearch() {
    setShowOutputBox(false);
    const value = valueInput.trim();

    if (!value) {
      alert("Enter value");
      return;
    }

    const generated = [];

    let found = false;

    for (let i = 0; i < list.length; i++) {
      generated.push(
        pushStep(
          list,
          [i],
          `Checking node ${list[i].value}`
        )
      );

      if (String(list[i].value) === value) {
        generated.push(
          pushStep(
            list,
            [i],
            `Value ${value} found at position ${i + 1}`
          )
        );

        found = true;
        break;
      }
    }

    if (!found) {
      generated.push(
        pushStep(
          list,
          [],
          `${value} not found in list`
        )
      );
    }

    startOperation(generated);
  }

  /* ==========================
      DISPLAY
     ========================== */

    function handleDisplay() {
       setInputMode("display");
      setShowOutputBox(true);

  const generated = [];

  if (list.length === 0) {

    generated.push(
      pushStep(
        list,
        [],
        "List is empty",
        "NULL"
      )
    );

    startOperation(generated);
    return;
  }

  let output = "";

  for (let i = 0; i < list.length; i++) {

    output += `${list[i].value} → `;

    generated.push(
      pushStep(
        list,
        [i],
        `Visiting node ${list[i].value}`,
        output
      )
    );
  }

  generated.push(
    pushStep(
      list,
      [],
      "Traversal completed",
      output + "NULL"
    )
  );

  startOperation(generated);
}

  /* ==========================
      NEXT STEP
     ========================== */

  function handleNext() {
    if (!steps.length) {
      alert("No operation prepared");
      return;
    }

    if (stepIndex >= steps.length) {
      const last = steps[steps.length - 1];

      setList(
        cloneList(last.list)
      );

      setSteps([]);

      setStepIndex(0);

      setPreviewStep(null);

      setControlsVisible(false);

      setHighlights([]);

      setStepDesc("Operation completed.");

      return;
    }

    const step = steps[stepIndex];

    setPreviewStep(null);

    setList(
      cloneList(step.list)
    );

    setHighlights(
      step.highlights || []
    );

    setStepDesc(
      step.desc || ""
    );

    setDisplayOutput(
        step.output || ""
    );

    setStepIndex(stepIndex + 1);
  }

  /* ==========================
      RESET
     ========================== */

  function handleReset() {
    setList(
      cloneList(originalList)
    );

    setSteps([]);

    setStepIndex(0);

    setPreviewStep(null);

    setControlsVisible(false);

    setHighlights([]);

    setStepDesc("");

    setNote("Operation reset.");
  }

  const view = getView();

  const viewList = view.list;

  const viewHighlights =
    view.highlights || [];
  return (
  <>
    <div className="logo-part">DSA Visualizer</div>

    <div className="mainbox">
      <VisualizerPageHeader
        title="Linked List Visualizer"
        backTo="/linked-list"
      />

      <div className="dav-wrapper">
        <div className="dav-card">

          <div className="dav-title">
            Singly Linked List Visualizer
          </div>

          <div className="dav-card-header">
            <button
              className="dav-btn dav-primary"
              onClick={handleCreate}
            >
              Create Empty List
            </button>

            <div
              style={{
                color: "#666",
                marginLeft: "10px"
              }}
            >
              Start with an empty linked list
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              color: "#7a1a1a",
              fontWeight: 600
            }}
          >
            {note}
          </div>

          {opsVisible && (

<div
  className="dav-ops-row"
  
>
            <div className="dav-actions">

  {/* Insert Dropdown */}
  <div className="dropdown">

    <button
      className="btn dav-primary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      Insert
    </button>

    <ul className="dropdown-menu">

      <li>
        <button
          className="dropdown-item"
          onClick={() => setInputMode("insertBegin")}
        >
          At Beginning
        </button>
      </li>

      <li>
        <button
          className="dropdown-item"
          onClick={() => setInputMode("insertEnd")}
        >
          At End
        </button>
      </li>

      <li>
        <button
          className="dropdown-item"
          onClick={() => setInputMode("insertPos")}
        >
          At Position
        </button>
      </li>

    </ul>

  </div>

  {/* Delete Dropdown */}

  <div className="dropdown">

    <button
      className="btn dav-primary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      Delete
    </button>

    <ul className="dropdown-menu">

      <li>
        <button
          className="dropdown-item"
          onClick={() => setInputMode("deleteBegin")}
        >
          At Beginning
        </button>
      </li>

      <li>
        <button
          className="dropdown-item"
          onClick={() => setInputMode("deleteEnd")}
        >
          At End
        </button>
      </li>

      <li>
        <button
          className="dropdown-item"
          onClick={() => setInputMode("deletePos")}
        >
          At Position
        </button>
      </li>

    </ul>

  </div>

  <button
    className="dav-btn dav-primary"
    onClick={() => setInputMode("search")}
  >
    Search
  </button>

  <button
  className="dav-btn dav-primary"
  onClick={() => {
    setInputMode("display");
    handleDisplay();
  }}
>
  Display
</button>

</div>
          </div>
          )}

          {opsVisible && inputMode === "insertBegin" && (
            <div className="dav-input-section">
              <input
                className="dav-input"
                placeholder="Value"
                value={valueInput}
                onChange={(e) =>
                  setValueInput(e.target.value)
                }
              />

              <button
                className="dav-btn dav-primary"
                onClick={handleInsertBeginning}
              >
                Insert
              </button>
            </div>
          )}

          {opsVisible && inputMode === "insertEnd" && (
            <div className="dav-input-section">
              <input
                className="dav-input"
                placeholder="Value"
                value={valueInput}
                onChange={(e) =>
                  setValueInput(e.target.value)
                }
              />

              <button
                className="dav-btn dav-primary"
                onClick={handleInsertEnd}
              >
                Insert
              </button>
            </div>
          )}

          {opsVisible && inputMode === "insertPos" && (
            <div className="dav-input-section">

              <input
                className="dav-input"
                placeholder="Value"
                value={valueInput}
                onChange={(e) =>
                  setValueInput(e.target.value)
                }
              />

              <input
                className="dav-input"
                placeholder="Position"
                value={positionInput}
                onChange={(e) =>
                  setPositionInput(e.target.value)
                }
              />

              <button
                className="dav-btn dav-primary"
                onClick={handleInsertPosition}
              >
                Insert
              </button>

            </div>
          )}

          {opsVisible && inputMode === "deleteBegin" && (
            <div className="dav-input-section">
              <button
                className="dav-btn dav-primary"
                onClick={handleDeleteBeginning}
              >
                Delete
              </button>
            </div>
          )}

          {opsVisible && inputMode === "deleteEnd" && (
            <div className="dav-input-section">
              <button
                className="dav-btn dav-primary"
                onClick={handleDeleteEnd}
              >
                Delete
              </button>
            </div>
          )}

          {opsVisible && inputMode === "deletePos" && (
            <div className="dav-input-section">

              <input
                className="dav-input"
                placeholder="Position"
                value={positionInput}
                onChange={(e) =>
                  setPositionInput(e.target.value)
                }
              />

              <button
                className="dav-btn dav-primary"
                onClick={handleDeletePosition}
              >
                Delete
              </button>

            </div>
          )}

          {opsVisible && inputMode === "search" && (
            <div className="dav-input-section">

              <input
                className="dav-input"
                placeholder="Search Value"
                value={valueInput}
                onChange={(e) =>
                  setValueInput(e.target.value)
                }
              />

              <button
                className="dav-btn dav-primary"
                onClick={handleSearch}
              >
                Search
              </button>

            </div>
          )}

          {opsVisible && inputMode === "display" && (
            <div className="dav-input-section">

              <button
                className="dav-btn dav-primary"
                onClick={handleDisplay}
              >
                Display
              </button>

            </div>
          )}

          {opsVisible && (

<>
          <div className="dav-length">
            Nodes : {viewList.length}
          </div>

          <div className="ll-main-area">

            <div className="ll-left">

              <div className="dav-visual-area">

                <div className="ll-head-label">
                  HEAD
                </div>

                {viewList.length === 0 && (
                  <div className="ll-null">
                    NULL
                  </div>
                )}

                {viewList.map((node, index) => (
                  <div
                    key={index}
                    className="ll-wrapper"
                  >
                    <div
                      className={`dav-item ${
                        viewHighlights.includes(index)
                          ? "highlight"
                          : ""
                      }`}
                    >
                      {node.value}
                    </div>

                    <div className="ll-arrow">
                      →
                    </div>
                  </div>
                ))}

                {viewList.length > 0 && (
                  <div className="ll-null">
                    NULL
                  </div>
                )}

              </div>

            </div>

           {showOutputBox && (

<div className="ll-output-box">

  <div className="ll-output-title">
    Display Output
  </div>

  <div className="ll-output-content">
    {displayOutput}
  </div>

</div>

)}

          </div>

          <div
            className="dav-length"
            style={{
              fontStyle: "italic",
              minHeight: "25px"
            }}
          >
            {stepDesc}
          </div>

          {controlsVisible && (
            <div className="dav-card-header">

              <button
                className="dav-btn dav-ghost"
                onClick={handleNext}
              >
                Next Step
              </button>

              <button
                className="dav-btn dav-ghost"
                onClick={handleReset}
              >
                Reset
              </button>


            </div>
          
          )}
          </>
          )}

        </div>
      </div>
    </div>
  </>
);
}

export default LinkedListVisualizer;
