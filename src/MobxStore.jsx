import {makeAutoObservable, makeObservable, observable} from "mobx";

const mobxStore = makeAutoObservable({

    boards: [],

    boardsDto: [],

    setTaskList(task) {
        this.boards.replace(task)
        console.log(this.boards)
    },

    get getTask() {
        return this.boards
    },

    addTask(id, newTask) {
        this.boardsDto = this.boards.filter(taskList => taskList.id == id)[0]
        const nowDate = new Date();
        const maxId = Math.max(...this.boards.map(board => Math.max(...board.tasks.map(task => task.id))))
        this.boardsDto.tasks.push({
            "id": maxId + 1,
            "title": newTask,
            "start": nowDate.toLocaleDateString(),
            "comment": ""
        })
        const numId = parseInt(id)
        this.boards.splice(numId - 1, 1, this.boardsDto)
    },
    addList(text) {
        this.boards.push({
            "id": Math.max(...this.tasks.map(board => board.id)) + 1,
            "title": text,
            "tasks": []
        })
    },
    onDragEnd(result) {
        const {destination, source, draggableId, type} = result;
        console.log(result)
        if (!destination) {
            return;
        }
        if (type === 'list') {
            const moveBoard = this.boards[source.index]
            this.boards.splice(source.index, 1)
            this.boards.splice(destination.index, 0, moveBoard)
        } else {
            console.log('type is different')
            // const moveTask = this.tasks
            const taskId = parseInt(source.droppableId.split('/')[1])
            const newTaskId = parseInt(destination.droppableId.split('/')[1])

            const moveTaskId = parseInt(draggableId.split('/')[1])
            const board = this.boards.find(board => board.id === taskId).tasks
            const newBoard = this.boards.find(board => board.id === newTaskId).tasks
            const moveTask = board.find(task => task.id === moveTaskId)

            if (source.droppableId !== destination.droppableId) {
                console.log('move board')
                board.splice(source.index, 1)
                newBoard.splice(destination.index, 0, moveTask)
            } else {
                board.splice(source.index, 1)
                board.splice(destination.index, 0, moveTask)
            }
        }
    },
    remove(boardId, index) {
        console.log(index, boardId)
        if (index > -1) {
            this.boards.find(board => board.id === boardId).tasks.splice(index, 1)
        }else {
            const foundBoard = this.boards.find(board => board.id === boardId)
            const boardIndex = this.boards.indexOf(foundBoard)
            this.boards.splice(boardIndex,1)
        }
    },
    updateTitle(newTitle, boardId) {
        this.boards.find(board => board.id === boardId).title = newTitle
    }
})

export {mobxStore}
