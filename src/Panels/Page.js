import React from 'react';
import PropTypes from 'prop-types';

// импортируем элементы
import {
  Panel,
  Group,
  InfoRow,
  PanelHeader,
  HeaderButton,
  platform,
  IOS,
  Div,
  Cell,
  List,
  Alert
 } from '@vkontakte/vkui';

// импортируем заглушку данных
import API_data from '../Modules/API_data'
// import area_code from '../Modules/area_code'

// импортируем иконки
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';


const osname = platform();

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: this.props.cardCode,
            progress: null,
            date: API_data(),
            popout: null
        };

    }

    add_progress() {

    	// return this.state.progress
    }

    openSheetRightAnswer() {
      this.props.setPopout(
        <Alert
          actions={[
          {
            title: 'Close',
            autoclose: true,
            style: 'destructive'
          }
          ]}
          onClose={() => this.props.setPopout(null)}>
          <h2>Поздравляем!</h2>
          <p>Вы прошли все контрольные точки</p>
        </Alert>
        );
      }

    render() {
        const props = this.props;
        console.log(props);
        return (
            <Panel id={props.id}>
				<PanelHeader left={<HeaderButton onClick={props.go} data-to="home">{osname === IOS ? <Icon24Cancel/> : <Icon24Cancel/>}</HeaderButton>}>
					Ориентирование
				</PanelHeader>

				<Group>
          <Div>
            <InfoRow title="Количество Контрольных Пунктов">
              { this.state.date[this.state.code].length }
            </InfoRow>
          </Div>
        </Group>

				<Group title="Доступные Контрольные точки">
          <Div>
          После прохождения всех контрольных точек вы станете победителем. Удачи!
          </Div>
          {
            this.state.date[this.state.code].map(i => {
      				return (
      					<Group>
                  <List>
                    <Cell expandable onClick={(e) => props.go(e, i)} data-to="task">{i.name}</Cell>
                  </List>
                </Group>
      				)
            })
          }
          <Group>
            <List>
              <Cell expandable onClick={this.openSheetRightAnswer.bind(this)}>Точка</Cell>
            </List>
          </Group>
				</Group>

			</Panel>
        );
    }
}

Page.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Page;
