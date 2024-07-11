import { useState } from "react";
const fileTree = {
  codebooks: {
    codebook: {
      type: "pdf",
      size: "50.5 KB",
    },
  },
  data: {
    aggregate: {
      aggregates: {
        type: "tab",
        size: "40 B",
      },
      raw: {
        output_data: {
          type: "tab",
          size: "127.7 KB",
        },
        quality_data: {
          type: "tab",
          size: "127.7 KB",
        },
      },
    },
    README: {
      type: "txt",
      size: "109 B",
    },
  },
};

function FileLink({ type, size, name }) {
  return (
    <a href={`${name}.${type}`} download>
      {name}.{type} ({size})
    </a>
  );
}

function FileTreeViewerComponent({ tree }) {
  const [closed, setClosed] = useState([]);

  function handleClose(child) {
    return () => {
      const isItClosedIdx = closed.findIndex((c) => c === child);
      if (isItClosedIdx !== -1) {
        const start = closed.slice(0, isItClosedIdx);
        const end = closed.slice(isItClosedIdx + 1);

        setClosed([...start, ...end]);
      } else {
        setClosed([...closed, child]);
      }
    };
  }

  function isClosed(child) {
    return closed.findIndex((c) => c === child) !== -1;
  }

  return (
    <ul className="filetree">
      {Object.keys(tree).map((child) => (
        <li key={child}>
          {tree[child].type ? (
            <FileIcon />
          ) : (
            <>
              <ChevronIcon
                onClick={handleClose(child)}
                closed={isClosed(child)}
              />{" "}
              <FolderIcon closed={isClosed(child)} />{" "}
            </>
          )}{" "}
          {tree[child].type ? (
            <FileLink
              name={child}
              type={tree[child].type}
              size={tree[child].size}
            />
          ) : null}
          {!tree[child].type ? child : null}
          {!isClosed(child) && !tree[child].type ? (
            <FileTreeViewerComponent tree={tree[child]} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function FileTreeViewer() {
  return (
    <>
      <h1>File Tree Viewer</h1>
      <div>
        Build a file tree viewer.
        <br />
        <img src="https://i.ibb.co/ftvw6d1/Whats-App-Image-2023-10-12-at-18-30-38.jpg" />
        <br />
        <br />
        <ol>
          <li>It should allow arbitrary levels of depth</li>
          <li>You should be able to expand/collapse any part of the tree</li>
          <li>Basic aesthetics with pure CSS</li>
        </ol>
      </div>

      <h3>Solution:</h3>

      <FileTreeViewerComponent tree={fileTree} />
    </>
  );
}

function ChevronIcon({ onClick, closed }) {
  return (
    <button className="unstyled" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={closed ? "closed" : "open"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
}

function FolderIcon({ closed = false }) {
  return closed ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}
