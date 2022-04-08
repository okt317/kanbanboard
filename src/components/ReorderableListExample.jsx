import * as classNames from 'classnames';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
// import "./ReorderExample.css"
import {useEffect, useState} from "react";


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const ReorderableListExample = () => {
    const [item, setItem] = useState([]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            item,
            result.source.index,
            result.destination.index
        );

        setItem(items)
    }
    useEffect(() => {
        setItem(Array(10).fill(0).map((_, i) => i))
    }, item)

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        className={classNames('list', snapshot.isDraggingOver
                            && 'draggingOver')}
                        {...provided.droppableProps}
                    >
                        {item.map((newItem, index) => (
                            <Draggable key={newItem} draggableId={`${newItem}-id`} index={index}>
                                {(provided, snapshot) => (
                                    <div className={classNames(
                                        'item', snapshot.isDragging && 'dragging'
                                    )}
                                         style={provided.draggableProps.style}
                                         ref={provided.innerRef}
                                         {...provided.draggableProps}
                                         {...provided.dragHandleProps}
                                    >
                                        List item {newItem + 1}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}