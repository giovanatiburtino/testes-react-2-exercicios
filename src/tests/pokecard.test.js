import { render, screen, waitFor } from "@testing-library/react"
import Pokecard from "../components/Pokecard"
import axios from "axios"
import { pokeCardMock } from "./PokeCardMock"
import userEvent from "@testing-library/user-event"

jest.mock("axios")

const urlMock = "https://pokeapi.co/api/v2/pokemon/2/"

const activeModalMock = jest.fn() // mock de função void, não espera retornar um resultado válido

const axiosResponseMock = {
    data: pokeCardMock
}

describe("Pokecard", () => {

    test("renderizar o componente pokecard", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);
        axios.get.mockResolvedValueOnce(activeModalMock);

        render(<Pokecard url={urlMock} openModal={activeModalMock} />)

        screen.debug()

        await waitFor(() => {})

        screen.debug()
    })

    test("renderizar o card com infos", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        render(<Pokecard url={urlMock} openModal={activeModalMock} />)

        await waitFor(() => {
            const img = screen.getByRole('img')

            expect(img).toBeInTheDocument()
        })

        const type1 = screen.getByText(/poison/i)
        const type2 = screen.getByText(/grass/i)

        expect(type1).toBeInTheDocument()
        expect(type2).toBeInTheDocument()
    })

    test("Ao clicar no card, é disparada a função que chama o modal", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        const user = userEvent.setup()

        render(<Pokecard url={urlMock} openModal={activeModalMock} />)

        const cardSelect = screen.getByRole('article')

        await user.click(cardSelect)

        expect(activeModalMock).toBeCalledTimes(1)
    })
})