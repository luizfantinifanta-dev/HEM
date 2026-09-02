"use client";

import { FormEvent, useEffect, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
};

function normalizarCpf(valor: string): string {
  return valor.replace(/\D/g, ""); // remove tudo que não é dígito
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [busca, setBusca] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const clientesSalvos = localStorage.getItem("hem-clientes");

    if (clientesSalvos) {
      setClientes(JSON.parse(clientesSalvos));
    }

    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) {
      return;
    }

    localStorage.setItem("hem-clientes", JSON.stringify(clientes));
  }, [clientes, carregado]);

  const clientesFiltrados = clientes.filter((cliente) => {
    const textoBusca = busca.toLowerCase().trim();

    if (!textoBusca) {
      return true;
    }

    if (cliente.nome.toLowerCase().includes(textoBusca)) {
      return true;
    }

    if (cliente.telefone.toLowerCase().includes(textoBusca)) {
      return true;
    }

    if (cliente.email.toLowerCase().includes(textoBusca)) {
      return true;
    }

    const cpfNumerico = normalizarCpf(cliente.cpf);
    const buscaNumerica = normalizarCpf(textoBusca);

    if (buscaNumerica && cpfNumerico.includes(buscaNumerica)) {
      return true;
    }

    return false;
  });

  function cadastrarCliente(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim() || !telefone.trim()) {
      alert("Preencha pelo menos o nome e o telefone do cliente.");
      return;
    }

    const novoCliente: Cliente = {
      id: Date.now(),
      nome: nome.trim(),
      cpf: cpf.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
    };

    setClientes((clientesAtuais) => [...clientesAtuais, novoCliente]);

    setNome("");
    setCpf("");
    setTelefone("");
    setEmail("");
  }

  function excluirCliente(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );

    if (confirmar) {
      setClientes((clientesAtuais) =>
        clientesAtuais.filter((cliente) => cliente.id !== id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-800 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            HeM Odontologia
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Clientes
          </h1>

          <p className="mt-2 text-slate-600">
            Cadastre e consulte os clientes da clínica.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Novo cliente
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Preencha os dados abaixo para cadastrar.
            </p>

            <form onSubmit={cadastrarCliente} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-1 block text-sm font-medium"
                >
                  Nome completo *
                </label>

                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Digite o nome"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="cpf"
                  className="mb-1 block text-sm font-medium"
                >
                  CPF
                </label>

                <input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(event) => setCpf(event.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="mb-1 block text-sm font-medium"
                >
                  Telefone *
                </label>

                <input
                  id="telefone"
                  type="tel"
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="cliente@email.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Cadastrar cliente
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Clientes cadastrados
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {clientesFiltrados.length}{" "}
                  {clientesFiltrados.length === 1
                    ? "cliente encontrado"
                    : "clientes encontrados"}
                </p>
              </div>

              <input
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Pesquisar por nome, CPF, telefone ou e-mail"
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {clientesFiltrados.length === 0 ? (
              <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center">
                <p className="font-medium text-slate-700">
                  Nenhum cliente encontrado
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {clientes.length === 0
                    ? "Use o formulário ao lado para adicionar o primeiro cliente."
                    : "Tente pesquisar com outro termo."}
                </p>
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-3 py-3 font-semibold">Nome</th>
                      <th className="px-3 py-3 font-semibold">CPF</th>
                      <th className="px-3 py-3 font-semibold">Telefone</th>
                      <th className="px-3 py-3 font-semibold">E-mail</th>
                      <th className="px-3 py-3 text-right font-semibold">
                        Ações
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {clientesFiltrados.map((cliente) => (
                      <tr
                        key={cliente.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-3 py-4 font-medium text-slate-900">
                          {cliente.nome}
                        </td>

                        <td className="px-3 py-4 text-slate-600">
                          {cliente.cpf || "-"}
                        </td>

                        <td className="px-3 py-4 text-slate-600">
                          {cliente.telefone}
                        </td>

                        <td className="px-3 py-4 text-slate-600">
                          {cliente.email || "-"}
                        </td>

                        <td className="px-3 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => excluirCliente(cliente.id)}
                            className="font-medium text-red-600 hover:text-red-800"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}