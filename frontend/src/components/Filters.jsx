function Filters({
  concluida,
  prioridade,
  setConcluida,
  setPrioridade,
}) {
  return (
    <div className="filters">
      <select
        value={concluida}
        onChange={(e) =>
          setConcluida(e.target.value)
        }
      >
        <option value="">Todas</option>
        <option value="true">
          Concluídas
        </option>
        <option value="false">
          Pendentes
        </option>
      </select>

      <select
        value={prioridade}
        onChange={(e) =>
          setPrioridade(e.target.value)
        }
      >
        <option value="">
          Todas prioridades
        </option>
        <option value="alta">Alta</option>
        <option value="media">Média</option>
        <option value="baixa">Baixa</option>
      </select>
    </div>
  );
}

export default Filters;