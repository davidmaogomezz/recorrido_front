<template>
  <div class="container">
    </p>
    <h3 id="modelo-entidad-relaci-n">Modelo entidad relación</h3>
    <p><img
        src="https://res.cloudinary.com/job-run/image/upload/v1660882522/Captura_de_Pantalla_2022-08-18_a_la_s_11.14.43_p._m._qyn3mu.png"
        alt="modelo entidad relación"></p>
    <p>Tenemos 3 tipos de usuarios:</p>
    <ol>
      <li>Client</li>
      <li>Admin</li>
      <li>Expert</li>
    </ol>
    <h3 id="el-usuario-cliente-puede-">El usuario Cliente puede:</h3>
    <ol>
      <li>Crear Contratos. Específica el período durante el cual estará vigente, los días y horas en los que necesitará
        que se le preste el servicio (mantenedor no desarrollo en la vista).</li>
      <li>Se puede loguear en la plataforma web y filtrar por contrato y semana para ver los turnos junto con el experto
        al cual fue asignado el turno</li>
    </ol>
    <h3 id="el-usuario-admin-puede-">El usuario Admin puede:</h3>
    <ol>
      <li>Aprobar el contrato creado por el cliente. (mantenedor no desarrollado)
        Si el contrato es aprobado se activa un callback llamado create_turns en el modelo <code>contract.rb</code> este
        callback nos va a crear todos los turnos pactados en el contrato</li>
      <li>Puede ingresar a la vista de turnos asignados y la vista de asignar disponibilidad de turnos. En la vista de
        disponibilidad de turnos el usuario admin puede decir cuales expertos están disponibles para determinado turno
        pero no puede asignar el turno a un determinado experto, esto lo hace el algoritmo de asignación de turnos.</li>
    </ol>
    <h3 id="el-usuario-expert-puede">El usuario Expert puede</h3>
    <ol>
      <li>Puede ingresar a la vista de turnos asignados</li>
      <li>Puede marcar/desmarcar solo su disponibilidad y ver la de otros expertos</li>
    </ol>
    <h3 id="algoritmo-de-asignaci-n-de-turnos-">Algoritmo de asignación de turnos:</h3>
    <ol>
      <li>Calculamos la carga laboral de cada experto.</li>
      <li>Si todos los expertos posibles para un turno están asignados como disponibles para ese turno, hacemos la
        asignación del turno al expertor que tenga menor carga laboral.</li>
      <li>Si se encuentra que todos los expertos disponibles para un turno tienen la misma carga laboral la asignación
        se hace de manera aleatoria. </li>
      <li>
        <p>Si faltando una hora para que el turno entre en vigencia el turno no tiene ningún experto marcado como
          disponible se ejecuta un rake task que asigna el turno según la logica mencionada en los literales 2 y 3.</p>
      </li>
    </ol>
    <p>Se puede ingresar con cualquiera de los siguientes usuarios</p>
    <table role="table" aria-busy="false" aria-colcount="2" class="table b-table table-turns">
      <thead>
        <tr>
          <th style="text-align:center">email</th>
          <th>contraseña</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align:center">admin@mail.com</td>
          <td>12345678</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td style="text-align:center">expert1@mail.com</td>
          <td>12345678</td>
          <td>Expert</td>
        </tr>
        <tr>
          <td style="text-align:center">expert2@mail.com</td>
          <td>12345678</td>
          <td>Expert</td>
        </tr>
        <tr>
          <td style="text-align:center">expert3@mail.com</td>
          <td>12345678</td>
          <td>Expert</td>
        </tr>
        <tr>
          <td style="text-align:center">client1@mail.com</td>
          <td>12345678</td>
          <td>Expert</td>
        </tr>
        <tr>
          <td style="text-align:center">client2@mail.com</td>
          <td>12345678</td>
          <td>Expert</td>
        </tr>
        <tr>
          <td style="text-align:center">client3@mail.com</td>
          <td>12345678</td>
          <td>Expert</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>