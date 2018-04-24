/**
 * MMMMM is a mobile app for Secure Scuttlebutt networks
 *
 * Copyright (C) 2017 Andre 'Staltz' Medeiros
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import xs, {Stream} from 'xstream';
import {PureComponent, Component} from 'react';
import {View, FlatList, Text, TextInput} from 'react-native';
import {h} from '@cycle/native-screen';
import {Palette} from '../../../global-styles/palette';
import {Msg} from 'ssb-typescript';
import Feed from '../../../components/Feed';
import {State} from './model';
import {SSBSource} from '../../../drivers/ssb';

export default function view(state$: Stream<State>, ssbSource: SSBSource) {
  const vdom$ = state$.map(state =>
    h(Feed, {
      selector: 'publicFeed',
      getReadable: state.getPublicFeedReadable,
      getPublicationsReadable: state.getSelfRootsReadable,
      publication$: ssbSource.publishHook$,
      selfFeedId: state.selfFeedId,
      showPublishHeader: true,
    }),
  );

  return vdom$;
}
