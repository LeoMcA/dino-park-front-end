import Vue from 'vue';
import Modal from './Modal.vue';
import getRenderedText from '../../../tests/utils/getRenderedText.js';

describe('Modal', () => {
  const Constructor = Vue.extend(Modal);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });

  it('should show close button if props.closeButton is true', () => {
    const component = new Constructor({
      propsData: { closeButton: true },
    }).$mount();
    const closeButton = component.$el.querySelector('.modal__close');
    expect(closeButton).toBeTruthy();
  });

  it('should show heading if props.heading is passed', () => {
    const msg = 'test';
    const text = getRenderedText(
      Modal,
      { heading: msg },
      '.modal__header > h1',
    );
    expect(text).toEqual(msg);
  });

  it('should html passed in as children', () => {
    const msg = 'test';
    const component = new Constructor();
    const newHtml = component.$createElement('article', msg);
    component.$slots.default = [newHtml];
    component.$mount();
    const content = component.$el.querySelector('article');

    expect(content.textContent).toEqual(msg);
  });
});
