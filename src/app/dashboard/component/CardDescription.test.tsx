// // CardDescription.test.tsx
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// // import CardDescription from "./CardDescription";

// // Simula o hook useRouter do next/navigation
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
// }));

// // Importa o useRouter simulado
// import { useRouter } from "next/navigation";
// import CardDescription from "./CardDescription";

// // Define o comportamento do useRouter simulado
// (useRouter as jest.Mock).mockReturnValue({
//   push: jest.fn(),
//   pathname: "/",
//   query: {},
//   asPath: "/",
//   back: jest.fn(),
//   prefetch: jest.fn(),
//   replace: jest.fn(),
//   events: {
//     on: jest.fn(),
//     off: jest.fn(),
//     emit: jest.fn(),
//   },
//   isFallback: false,
//   basePath: "",
//   locale: "pt-BR",
//   locales: ["pt-BR", "en-US"],
//   defaultLocale: "pt-BR",
//   isReady: true,
//   isPreview: false,
// });

// // Dados simulados para o teste
// const mockClose = jest.fn();
// const mockList = {
//   id: 1,
//   product_id: "prod-123",
//   order_id: "order-456",
//   created_at: new Date().toISOString(),
//   updated_at: new Date().toISOString(),
//   recurrence_pending: false,
//   product: {
//     uuid: "uuid-789",
//     name: "Produto Teste",
//     price: 1000,
//     description: "Descrição do Produto",
//     background_image: "https://via.placeholder.com/150",
//     status: "active",
//     currency: "BRL",
//     support_name: "Nome do Suporte",
//     support_email: "suporte@exemplo.com",
//     phone: "123456789",
//     category: "Categoria Teste",
//     language: "pt-BR",
//     recurrence: false,
//     refund_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
//   },
// };

// describe("CardDescription", () => {
//   it("deve renderizar as informações do produto", () => {
//     render(<CardDescription list={mockList} open={true} close={mockClose} />);
//     expect(screen.getByText("Produto Teste")).toBeInTheDocument();
//     expect(screen.getByText("Descrição do Produto")).toBeInTheDocument();
//   });

//   // it("deve chamar close(false) ao pressionar Escape", async () => {
//   //   render(<CardDescription list={mockList} open={true} close={mockClose} />);
//   //   const user = userEvent.setup();
//   //   await user.keyboard("{Escape}");
//   //   expect(mockClose).toHaveBeenCalledWith(false);
//   // });
// });
