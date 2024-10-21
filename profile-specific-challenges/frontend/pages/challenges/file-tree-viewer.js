const treeData = [
  {
    title: 'codebook',
    items: [
      {
        title: 'codebook.pdf',
        size: '50.5G',
        items: []
      },
      {
        title: 'format.txt',
        size: '50.5G',
        items: []
      }
    ],
  },
  {
    title: 'data',
    items: [
      {
        title: 'agregate',
        items: [
          {
            title: 'agregates.tabs',
            size: '50.5G',
            items: []
          }
        ]
      },
      {
        title: 'raw',
        items: [
          {
            title: 'agregates.tabs',
            items: [
              {
                title: 'output_data.tab',
                size: '126.7KG',
                items: []
              },
              {
                title: 'quality.tab',
                size: '126.7KG',
                items: []
              }
            ]
          }
        ]
      },
      {
        title: 'REDME.dm',
        size: '109B',
        items: []
      }
    ]
  }
]
const RenderSingleFile = ({title, size}) => {
  return <div className="file-inner">
    📄<span className="file-inner_title">{title}</span> 
      <b className="file-inner_size">({size})</b> 
  </div>
}
const RenderFolder = ({title, items}) => {
  return (
    <details>
      <summary>📁 {title}</summary>
        <div>
          {items.map((item, index) => {
            return (item.items.length > 0) 
              ? <RenderFolder key={index} {...item} />
              : <RenderSingleFile key={index} {...item} />
            }
          )}
        </div>
    </details>
  )
}

const RenderTreeViewer = ({items}) => {
  return items.map((item, index) => <RenderFolder key={index} {...item} />) 
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
        
         <div className="treeContainer">
          <h1>File Tree Viewer</h1>
          <RenderTreeViewer items={treeData} />
        </div> 
         
      </div>
    </>
  );
}
