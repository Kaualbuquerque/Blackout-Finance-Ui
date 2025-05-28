import { render, screen } from '@testing-library/react';
import Card from '../card';

// Mock de CSS Modules
jest.mock('../styles/component_styles/card.module.css', () => ({
    card: 'card',
    light_theme: 'light_theme',
    dark_theme: 'dark_theme',
}));

describe('Card Component', () => {
    // 🧪 Teste 1: renderização correta
    it('renders the title and description', () => {
        render(<Card title="Controle" description="Tenha um controle melhor do fluxo do seu dinhero" style="light_theme" />);

        expect(screen.getByText('Controle')).toBeInTheDocument();
        expect(screen.getByText('Tenha um controle melhor do fluxo do seu dinhero')).toBeInTheDocument();
    });

    // 🧪 Teste 2: classe correta baseada na prop "style"
    it('applies the correct CSS class based on style prop', () => {
        render(<Card title="Analise" description="Tenha acesso a graficos do seu fluxo de dinheiro" style="dark_theme" />);

        const cardElement = screen.getByText('Analise').closest('div');
        expect(cardElement).toHaveClass('card');
        expect(cardElement).toHaveClass('dark_theme');
    });
});
