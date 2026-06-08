import { useEffect, useState } from "react";

function TaskForm({
  onCreate,
  onUpdate,
  tarefaEditando,
}) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  useEffect(() => {
    if (tarefaEditando) {
      setTitulo(tarefaEditando.titulo);
      setDescricao(tarefaEditando.descricao);
      setPrioridade(tarefaEditando.prioridade);
    }
  }, [tarefaEditando]);

  async function handleSubmit(e) {
    e.preventDefault();

    const dados = {
      titulo,
      descricao,
      prioridade,
    };

    if (tarefaEditando) {
      await onUpdate(tarefaEditando.id, dados);
    } else {
      await onCreate(dados);
    }

    setTitulo("");
    setDescricao("");
    setPrioridade("media");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>
        {tarefaEditando
          ? "Editar Tarefa"
          : "Nova Tarefa"}
      </h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) =>
          setTitulo(e.target.value)
        }
        required
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) =>
          setDescricao(e.target.value)
        }
      />

      <select
        value={prioridade}
        onChange={(e) =>
          setPrioridade(e.target.value)
        }
      >
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>

      <button type="submit">
        {tarefaEditando
          ? "Salvar Alterações"
          : "Cadastrar Tarefa"}
      </button>
    </form>
  );
}

export default TaskForm;