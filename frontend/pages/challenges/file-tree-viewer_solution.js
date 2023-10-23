import * as React from 'react';

const TREE_STRUCTURE = {
  "type": "directory",
  "name": "root",
  "children": [
    {
      "type": "directory",
      "name": "folder1",
      "children": [
        {
          "type": "file",
          "name": "file1.txt",
          "size": 1024
        },
        {
          "type": "file",
          "name": "file2.txt",
          "size": 2048
        },
        {
          "type": "directory",
          "name": "subfolder2",
          "children": [
            {
              "type": "file",
              "name": "file5.txt",
              "size": 5120
            },
            {
              "type": "file",
              "name": "file6.txt",
              "size": 6144
            }
          ]
        }
      ]
    },
    {
      "type": "directory",
      "name": "folder2",
      "children": [
        {
          "type": "directory",
          "name": "subfolder1",
          "children": [
            {
              "type": "file",
              "name": "file3.txt",
              "size": 3072
            },
            {
              "type": "file",
              "name": "file7.txt",
              "size": 7168
            }
          ]
        },
        {
          "type": "directory",
          "name": "subfolder3",
          "children": [
            {
              "type": "file",
              "name": "file8.txt",
              "size": 8192
            },
            {
              "type": "file",
              "name": "file9.txt",
              "size": 9216
            }
          ]
        }
      ]
    },
    {
      "type": "file",
      "name": "file4.txt",
      "size": 4096
    },
    {
      "type": "file",
      "name": "file10.txt",
      "size": 10240
    }
  ]
}

const DirectoryEntry = ({tree}) => {
  const [open, setOpen] = React.useState(true)
  const toggleOpen = () => setOpen(open => !open)

  if (tree.type === 'file') {
    return <div key={tree.name} style={{ paddingLeft: '16px' }}>
        📄 {tree.name} <span className='size'>({tree.size} bytes)</span>
      </div>
  }

  return <div key={tree.name} style={{ paddingLeft: '16px' }}>
    <h2 onClick={toggleOpen}>{open ? '📂' : '📁'} {tree.name}</h2>
      <div className={open ? '' : 'hide'}>
        {tree.children.map((child) => (
          <DirectoryEntry key={child.name}  tree={child} />
        ))}
      </div>
  </div>
}

export default function FileTreeViewerSolution() {
  return(
    <>
      <h1>
        File Tree Viewer
      </h1>
      <div>
        <DirectoryEntry tree={TREE_STRUCTURE}/>
      </div>
    </>
  )
}