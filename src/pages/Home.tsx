import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if(taskWithSameTitle) {
      return Alert.alert("To.do já cadastrada", "Você não pode cadastrar um to.do com o mesmo nome");
    }

    const newTasks = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldTasks => [...oldTasks, newTasks]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundItem = updatedTasks.find(item => item.id === id);

    if(!foundItem) {
      return;
    }
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover to.do', 'Tem certeza que você deseja remover esse to.do?', [
      {
        style: 'cancel',
        text: 'Não',
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter(item => item.id !== id);

          setTasks(updatedTasks);
        }
      },
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId);

    if(!taskToBeUpdated) {
      return;
    }
    taskToBeUpdated.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})