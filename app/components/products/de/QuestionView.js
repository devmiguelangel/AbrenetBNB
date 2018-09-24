import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

import { styles } from "@assets";
import { db } from '@utils';
import { LoadingView } from '@libs';

export default class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerRef: null,
      detailRef: null,
      modal: false,
      loading: false,
      questions: [
        {
          number: 1,
          text: '¿Tiene o ha tenido alguna enfermedad que requirió hospitalización?',
          value: false,
        },
        {
          number: 2,
          text: '¿Tiene o ha tenido algún tipo de cáncer?',
          value: false,
        },
        {
          number: 3,
          text: '¿Tiene o ha tenido problemas o enfermedades cardiacas?',
          value: false,
        },
        {
          number: 4,
          text: '¿Ha sido sometido a alguna operación quirúrgica en los últimos tres años?',
          value: false,
        },
        {
          number: 5,
          text: '¿Fuma mas de diez cigarrillos diarios?',
          value: false,
        },
        {
          number: 6,
          text: 'Tiene sida o es portador del Virus de la Inmunodeficiencia Humana - VIH',
          value: false,
        },
        {
          number: 7,
          text: '¿Realiza o participa usted de alguna actividad o deporte de alto riesgo?',
          value: false,
        },
        {
          number: 8,
          text: '¿Esta recibiendo tratamiento médico?',
          value: false,
        },
      ],
    }
  }

  handleInputChange = (index, value) => {
    let { questions } = this.state;
    questions[index].value = value;
    
    this.setState({ questions })
  }
  
  _handleOpen = (headerRef, detailRef) => {
    this.setState({ modal: true, headerRef, detailRef });
  }

  handleStore = () => {
    this.setState({ loading: true });

    const { headerRef, detailRef, questions } = this.state;
    const date = moment();

    db.collection(`de_headers/${headerRef.id}/details/${detailRef.id}/response`)
      .add({
        questions,
        observation: '',
        createdAt: date.toDate(),
        updatedAt: date.toDate(),
      })
      .then((docRef) => {
        this.setState({ loading: false, modal: false });
      })
      .catch((error) => {
        this.setState({ loading: false });

        console.error("Error adding document 1: ", error);
      });
  }

  render() {
    const { modal, loading, questions } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => { }}
      >
        {
          loading && (
            <LoadingView />
          )
        }
        <View style={styles.modalContainer}>
          <View style={css.questionnaireBox}>
            <View style={styles.formSubTitleBox}>
              <Text style={styles.formSubTitleText}>
                Cuestionario de Salud
              </Text>
            </View>

            <View style={{flex: 1}}>
              {
                questions.map((item, index) => {
                  return (
                    <View style={styles.questionBox} key={index}>
                      <Text style={styles.questionNumber}>{index + 1}.</Text>
                      <Text style={styles.questionText}>{item.text}</Text>
                      <Switch
                        onTintColor="#54C7FC"
                        value={item.value}
                        onValueChange={(value) => this.handleInputChange(index, value)}
                      />
                    </View>
                  )
                })
              }
            </View>

            <TouchableOpacity
              style={styles.formButtonTouch}
              activeOpacity={0.6}
              onPress={() => this.handleStore()}
            >
              <View style={styles.formButtonBox}>
                <Text style={styles.formButtonText}>
                  Guardar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const css = StyleSheet.create({
  questionnaireBox: {
    width: '90%',
    height: '95%',
    backgroundColor: 'white',
    padding: 10,
  },
});