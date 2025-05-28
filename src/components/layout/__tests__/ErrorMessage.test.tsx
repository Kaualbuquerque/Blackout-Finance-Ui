import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';
import '@testing-library/jest-dom';

describe('ErrorMessage component', () => {
  // Teste 1 – Renderiza a mensagem corretamente
  it('renders the error message when message is provided', () => {
    render(<ErrorMessage message="Ocorreu um erro" onClear={() => {}} />);
    expect(screen.getByText("Ocorreu um erro")).toBeInTheDocument();
  });

  // Teste 2 – Chama onClear após 4 segundos
  it('calls onClear after 4 seconds', () => {
    jest.useFakeTimers();
    const onClearMock = jest.fn();

    render(<ErrorMessage message="Erro temporário" onClear={onClearMock} />);

    // Avança o tempo em 4000ms
    jest.advanceTimersByTime(4000);

    expect(onClearMock).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  // Teste 3 – Não renderiza nada se a mensagem for vazia
  it('does not render anything if message is an empty string', () => {
    const { container } = render(<ErrorMessage message="" onClear={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
