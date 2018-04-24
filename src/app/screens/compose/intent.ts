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

import {Stream} from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine';
import {ScreensSource} from 'cycle-native-navigation';
import {Screens} from '../..';
import {State} from './model';

export default function intent(
  source: ScreensSource,
  publish$: Stream<any>,
  state$: Stream<State>,
) {
  return {
    publishMsg$: publish$
      .compose(sampleCombine(state$))
      .map(([_, state]) => state.postText)
      .filter(text => text.length > 0),

    updatePostText$: source
      .select('composeInput')
      .events('changeText') as Stream<string>,

    willDisappear$: source.willDisappear(Screens.Compose),
  };
}
