const contenido = document.getElementById("contenido");

const fechaInicio = new Date("2026-11-21T00:00:00");
const fechaFin = new Date("2026-12-21T23:59:59");
const ahora = new Date();

async function verificarGiftCard() {

    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");

    if (!codigo) {
        mostrarError("No se recibió ningún código.");
        return;
    }

    try {

        const respuesta = await fetch("tarjetas.json");

        if (!respuesta.ok) {
            throw new Error("No fue posible leer tarjetas.json");
        }

        const tarjetas = await respuesta.json();

        if (!tarjetas[codigo]) {
            mostrarError("Esta Gift Card no existe.");
            return;
        }

        const tarjeta = tarjetas[codigo];

        let estadoFecha = "";

        if (ahora < fechaInicio) {

            estadoFecha = `
                <div class="estado pendiente">
                    ⏳ Esta Gift Card aún no está vigente.
                </div>
            `;

        } else if (ahora > fechaFin) {

            estadoFecha = `
                <div class="estado vencida">
                    ❌ Esta Gift Card se encuentra vencida.
                </div>
            `;

        } else {

            estadoFecha = `
                <div class="estado valida">
                    ✅ Gift Card válida.
                </div>
            `;

        }

        contenido.innerHTML = `

            <div class="success">

                <div class="check">
                    ✔
                </div>

                <h1>Gift Card Auténtica</h1>

                ${estadoFecha}

                <div class="datos">

                    <div class="fila">
                        <span>Código</span>
                        <strong>${codigo}</strong>
                    </div>

                    <div class="fila">
                        <span>Ganador</span>
                        <strong>${tarjeta.cliente}</strong>
                    </div>

                    <div class="fila">
                        <span>Premio</span>
                        <strong>${tarjeta.premio}</strong>
                    </div>

                    <div class="fila">
                        <span>Estado</span>
                        <strong>${tarjeta.estado}</strong>
                    </div>

                    <div class="fila">
                        <span>Vigencia</span>
                        <strong>21 Nov 2026 - 21 Dic 2026</strong>
                    </div>

                </div>

                <div class="mensaje">

                    Esta Gift Card fue verificada correctamente en el
                    <strong>Sistema Oficial de PINO CAUCHOS.</strong>

                </div>

            </div>

        `;

    } catch (error) {

        mostrarError("Ocurrió un error al verificar la Gift Card.");

    }

}

function mostrarError(texto) {

    contenido.innerHTML = `

        <div class="error">

            <div class="errorIcon">
                ✖
            </div>

            <h1>Gift Card no válida</h1>

            <p>${texto}</p>

        </div>

    `;

}

verificarGiftCard();
