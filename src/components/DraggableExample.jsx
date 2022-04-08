import * as classNames from 'classnames';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import "./example.css"

export const DraggableExample = () => {
    const onDragEnd = () => {
        console.log('end')
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        className={classNames('container', snapshot.isDraggingOver
                            && 'draggingOver')}
                        {...provided.droppableProps}
                    >

                        <Draggable draggableId="0" index={0}>
                            {(provided, snapshot) => (
                                <div className={classNames(
                                    'item', snapshot.isDragging && 'dragging'
                                )}
                                     style={provided.draggableProps.style}
                                     ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                />
                            )}
                        </Draggable>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}