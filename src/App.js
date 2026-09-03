
//import { useState } from 'react';
import Board from './Components/Board';
import useLocalStorage from './Local Storage Hook/LocalStorage';
import Introduction from './Components/Introduction';
import Notfound from './Components/Notfound';
import { Routes, Route } from 'react-router-dom';
;

function App() {
  //const [lists,setLists]=useState([]);
  const [lists,setLists]=useLocalStorage([],"trello-demo")


  const addList = (title) => {
    const newList = {listid:Math.random()*4,title,focuscheck:false,addcheck:false,tasks:[]};
    setLists([...lists,newList]);
  };
  
  const deleteList = (listid) => {
    const updateList = lists.filter((list)=>{return list.listid !== listid});
    setLists(updateList);
  };

  const editListTitle = (newTitle,listid) => {
    const updateList = lists.map((list)=>{
      if(list.listid===listid){
        list.title=newTitle
      }
      return list
    });
    setLists([...updateList]);
  };
  
  const addChecker=(listid)=>{
    const updateList =lists.map((list)=>{
      if(list.listid===listid){
        list.addcheck=true;
        list.focuscheck=false;
        list.tasks.map((task)=>{task.editcheck=false;return task})
            }else{
              list.addcheck=false;
              list.focuscheck=false;
              list.tasks.map((task)=>{task.editcheck=false;return task})
            }    
      return list;
    })
    setLists([...updateList]);
  };


  const focusChecker=(listid)=>{
    const updateList =lists.map((list)=>{
      if(list.listid===listid){
      list.focuscheck=true;
      list.addcheck=false;
      list.tasks.map((task)=>{task.editcheck=false ; return task})
      }else{
        list.focuscheck=false;
        list.addcheck=false;
        list.tasks.map((task)=>{task.editcheck=false ; return task})
      }   
      return list;
    })
    setLists([...updateList]);
  };


  const addTask = (content,listid)=>{
    const newTask={taskid:Math.random()*4,content,editcheck:false};
    const updateList =lists.map((list)=>{
      if(list.listid === listid && content){
        list.tasks.push(newTask);
      }
      return list
    })
    setLists([...updateList]);
  };
  
  
const editTaskChecker=(taskid)=>{
  const updateList =lists.map((list)=>{
    list.focuscheck=false;
    list.addcheck=false;
    list.tasks.map((task)=>{
      if(taskid===task.taskid){
        task.editcheck=true;
      }else{
        task.editcheck=false;
      }
      return task;
    })  
    return list;
  })
  setLists([...updateList]);
}

  const editTask = (text,taskid)=>{
    const updateList =lists.map((list)=>{
        list.tasks.map((task)=>{
          if(task.taskid===taskid){
            task.content=text;
          }
          return task
        })
    return list;
    })
    setLists([...updateList]);
  };

  

  const deleteTask = (listid,taskid) => {
    const updateList = lists.map((list)=>{
      if(list.listid===listid){
        const tasks =list.tasks.filter((task)=>{
          return task.taskid!==taskid
        })
        list.tasks=tasks;
      }
      return list
        });
  setLists(updateList);
};
  const resetList = (listid)=>{
    const updateList=lists.map((list)=>{
      if(list.listid===listid){
        list.addcheck=false;
        list.focuscheck=false;
      }
      return list
    });
    setLists(updateList)
  }

const swapList=(toIndex,cardid)=>{
  const updateList = lists.filter((list)=>{return list.listid!==cardid});
  const [currentList]= lists.filter((list)=>{return list.listid===cardid});
  updateList.splice(toIndex,0,currentList);
  setLists(updateList)
  
}
const resetTask =(listid,taskid)=>{
   const updateList = lists.map((list)=>{
    if(listid!==list.listid){
      list.tasks.map((task)=>{
        if(taskid!==task.taskid){
          task.editcheck=false
        }
        return task
      })
    }
    return list
   })
   setLists(updateList)
}
const swapTask=(toIndex,cardid,taskid,cardindex)=>{
  
  const [currentListObj]=lists.filter((list)=>{return list.listid===cardid})
  const currentListValues=Object.values(currentListObj)
  const [currentTasksArray]=currentListValues.filter((item)=>{return Array.isArray(item)})
  const [currentTaskObj]=currentTasksArray.filter((task)=>{return taskid===task.taskid})
 
  const updateList=lists.map((list)=>{
      if(list.listid===cardid){
        const tasks = list.tasks.filter((task)=>{return task.taskid!==taskid})
        list.tasks=tasks
      } 
      return list
      });
  
      if (updateList[cardindex]) {
        updateList[cardindex]["tasks"].splice(toIndex, 0, currentTaskObj);
      } 
  setLists(updateList) 
}
const bringTask=(toIndex,cardid,sourceid,taskid,taskindex)=>{
  
  const [currentListObj]=lists.filter((list)=>{return list.listid===sourceid})
  const currentListValues=Object.values(currentListObj)
  const [currentTasksArray]=currentListValues.filter((item)=>{return Array.isArray(item)})
  const [currentTaskObj]=currentTasksArray.filter((task)=>{return taskid===task.taskid})
  
  const updateList=lists.map((list)=>{
    if(list.listid===sourceid){
      list.tasks.splice(taskindex,1)
    }
    if(list.listid===cardid){
      list.tasks.splice(toIndex,0,currentTaskObj)     
    }
    return list
  })

  setLists(updateList)
  
}
  return (
    <>
        <Routes>
            <Route path="/" element={<Introduction/>}/>  
            <Route path="/workspace" element={<Board lists={lists}
                                                     addList={addList}
                                                     addChecker={addChecker}
                                                     focusChecker={focusChecker}
                                                     addTask={addTask}
                                                     editTaskChecker={editTaskChecker}
                                                     editTask={editTask}
                                                     deleteList={deleteList}
                                                     editListTitle={editListTitle}
                                                     deleteTask={deleteTask}
                                                     resetList={resetList}
                                                     swapList={swapList}
                                                     resetTask={resetTask}
                                                     swapTask={swapTask}
                                                     bringTask={bringTask}
                                                   />}/>
            <Route path="/*" element={<Notfound/>}/>                                         
        </Routes>   
    </>       
  );
  
}

export default App;
