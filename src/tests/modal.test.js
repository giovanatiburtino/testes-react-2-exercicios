import { render, screen } from "@testing-library/react"
import Modal from '../components/Modal'
import userEvent from "@testing-library/user-event"

const activeModalMock = {
    id: 6,
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    },
    types: [
      {
        type: {
            name: "fire"
        }
      }
    ],
    name: "charizard",
    weight: 1000,
    height: 20
}


const closeModalMock = jest.fn()


describe("test modal", () => {
    test("Abrir modal", () => {
        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)
    
        const id = screen.getByRole('heading', { name: /#6 charizard/i })
        const image = screen.getByRole('img', { name: /charizard/i })
        const name = screen.getByText(/charizard/i)
        const weight = screen.getByText(/100\.0 kg/i)
        const height = screen.getByText(/2\.0 m/i)
        const type = screen.getByText(/fire/i)
        const button = screen.getByRole('button', { name: /❌/i })

        expect(id).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(height).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    test("Fechar Modal", async () => {
        const user = userEvent.setup()

        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)

        const button = screen.getByRole('button', { name: /❌/i })

        await user.click(button)

        const element = screen.queryByText('button')

		expect(element).not.toBeInTheDocument()
    })
}) 