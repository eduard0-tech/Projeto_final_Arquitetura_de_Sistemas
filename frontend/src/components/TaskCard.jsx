function TaskCard({
  tarefa,
  onDelete,
  onToggle,
  onEdit,
}) {
  return (
    <div
      className={`tarefa ${
        tarefa.concluida ? "done" : ""
      }`}
    >
      <div>
        <h3>{tarefa.titulo}</h3>

        <p>{tarefa.descricao}</p>

        <span
          className={`prioridade ${tarefa.prioridade}`}
        >
          {tarefa.prioridade}
        </span>
      </div>

      <div className="acoes">
        <button
          onClick={() => onToggle(tarefa.id)}
        >
          {tarefa.concluida
            ? "Desfazer"
            : "Concluir"}
        </button>

        <button
          onClick={() => onEdit(tarefa)}
        >
          Editar
        </button>

        <button
          className="delete"
          onClick={() => onDelete(tarefa.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskCard;