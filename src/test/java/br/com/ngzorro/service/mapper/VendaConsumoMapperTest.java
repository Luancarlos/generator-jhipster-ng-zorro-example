package br.com.ngzorro.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class VendaConsumoMapperTest {

    private VendaConsumoMapper vendaConsumoMapper;

    @BeforeEach
    public void setUp() {
        vendaConsumoMapper = new VendaConsumoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(vendaConsumoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(vendaConsumoMapper.fromId(null)).isNull();
    }
}
