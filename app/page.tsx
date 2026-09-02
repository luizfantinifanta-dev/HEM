export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900">
          HeM Odontologia
        </h1>

        <p className="mt-2 text-gray-600">
          Sistema administrativo
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="font-semibold text-gray-800">
              Clientes
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Cadastro e importação de clientes
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="font-semibold text-gray-800">
              Controle de ponto
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Acompanhamento dos funcionários
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="font-semibold text-gray-800">
              Relatórios
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Status das atividades administrativas
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}