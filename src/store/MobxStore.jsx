import {makeAutoObservable, observable} from "mobx";

const mobxStore = makeAutoObservable({

    boards: [],

    listOrder: [],

    setBoards(data) {
        this.boards.replace(data.kanbanBoard)
        this.listOrder.replace(data.listOrder)
    },

    addTask(boardId, newTask) {
        const targetBoard = this.boards.filter(taskList => taskList.id == boardId)[0]
        const nowDate = new Date();
        const year = nowDate.getFullYear();
        const month = nowDate.getMonth() + 1;
        const date = nowDate.getDate();
        const startDate = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date)
        let maxId = Math.max(...this.boards.map(board => Math.max(...board.tasks.map(task => task.id))))
        if (!isFinite(maxId)) {
            maxId = 0
        }
        targetBoard.tasks.push({
            "id": maxId + 1,
            "title": newTask,
            "start": startDate,
            "comment": ""
        })
        const index = this.listOrder.indexOf(parseInt(boardId))
        this.boards.splice(index, 1, targetBoard)
        console.log(this.boards)
    },
    addList(text) {
        console.log(text)
        const maxId = Math.max(...this.boards.map(board => board.id))
        this.boards.push({
            "id": maxId + 1,
            "title": text,
            "tasks": []
        })
        this.listOrder.push(maxId + 1)
        console.log(this.boards)
    },
    onDragEnd(result) {
        const {destination, source, draggableId, type} = result;
        console.log(result)
        const dragIdNum = parseInt(draggableId.split('/')[1])
        if (!destination) {
            return;
        }
        if (type === 'list') {
            const moveBoard = this.boards[source.index]
            this.boards.splice(source.index, 1)
            this.boards.splice(destination.index, 0, moveBoard)
            this.listOrder.splice(this.listOrder.indexOf(dragIdNum), 1)
            this.listOrder.splice(destination.index, 0, dragIdNum)

        } else {
            const taskId = parseInt(source.droppableId.split('/')[1])
            const newTaskId = parseInt(destination.droppableId.split('/')[1])

            // const dragIdNum = parseInt(draggableId.split('/')[1])
            const board = this.boards.find(board => board.id === taskId).tasks
            const newBoard = this.boards.find(board => board.id === newTaskId).tasks
            const moveTask = board.find(task => task.id === dragIdNum)

            if (source.droppableId !== destination.droppableId) {
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
        const targetBoard = this.boards.find(board => board.id === boardId);
        const targetIndex = this.boards.indexOf(targetBoard);
        if (index > -1) { //Delete Task
            targetBoard.tasks.splice(index, 1);
            this.boards.splice(targetIndex, 1);
            this.boards.splice(targetIndex, 0, targetBoard);

        } else { //Delete Board
            this.boards.splice(targetIndex, 1)
            this.listOrder.splice(this.listOrder.indexOf(boardId), 1)
        }
    },
    updateTitle(newTitle, boardId) {
        this.boards.find(board => board.id === boardId).title = newTitle
    },
    updateDate(newDate, boardId) {

    }
})

export {mobxStore}
