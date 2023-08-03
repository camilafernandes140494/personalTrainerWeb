import React, { useContext } from "react";
import { AuthContext } from "../../Service/Connection/AuthContext";
import Nav from "../Nav/Nav";

function PlansPrices() {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Exibe uma mensagem de carregamento enquanto verifica o estado de autenticação
  }

  if (!user) {
    return <p>Usuário não autenticado</p>; // Exibe uma mensagem quando o usuário não estiver autenticado
  }

  return (
    <div
      style={{
        borderRadius: "10%",
        backgroundColor: "rgba(217, 217, 217, 0.4)",
      }}
    >
      <Nav activeItems={4} />
      <p style={{ color: "black" }}>Bem-vindo, {user.email}!</p>{" "}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default PlansPrices;
