import { useEffect, useState } from "react";
import { api } from "../services/api";

import Header from "../components/Header";
import Stats from "../components/Stats";
import Filters from "../components/Filters";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [stats, setStats] = useState({});
  const [tarefaEditando, setTarefaEditando] =
    useState(null);

  const [concluida, setConcluida] =
    useState("");

  const [prioridade, setPrioridade] =
    useState("");

  async function carregarTarefas() {
    const response = await api.get("/tarefas", {
      params: {
        concluida,
        prioridade,
      },
    });

    setTarefas(response.data.dados);
  }

  async function carregarStats() {
    const response = await api.get("/tarefas/stats");
    setStats(response.data.dados);
  }

  async function criar(dados) {
    await api.post("/tarefas", dados);

    carregarTarefas();
    carregarStats();
  }

  async function atualizar(id, dados) {
    await api.put(`/tarefas/${id}`, dados);

    setTarefaEditando(null);

    carregarTarefas();
    carregarStats();
  }

  async function excluir(id) {
    await api.delete(`/tarefas/${id}`);

    carregarTarefas();
    carregarStats();
  }

  async function concluir(id) {
    await api.patch(`/tarefas/${id}/concluir`);

    carregarTarefas();
    carregarStats();
  }

  useEffect(() => {
    carregarTarefas();
  }, [concluida, prioridade]);

  useEffect(() => {
    carregarStats();
  }, []);

  return (
    <div className="container">
      <Header />

      <Stats stats={stats} />

      <Filters
        concluida={concluida}
        prioridade={prioridade}
        setConcluida={setConcluida}
        setPrioridade={setPrioridade}
      />

      <TaskForm
        onCreate={criar}
        onUpdate={atualizar}
        tarefaEditando={tarefaEditando}
      />

      <TaskList
        tarefas={tarefas}
        onDelete={excluir}
        onToggle={concluir}
        onEdit={setTarefaEditando}
      />
    </div>
  );
}

export default Home;