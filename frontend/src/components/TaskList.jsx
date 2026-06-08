import TaskCard from "./TaskCard";

function TaskList({
  tarefas,
  onDelete,
  onToggle,
  onEdit,
}) {
  return (
    <div className="lista">
      <h2>Tarefas</h2>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        tarefas.map((tarefa) => (
          <TaskCard
            key={tarefa.id}
            tarefa={tarefa}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;