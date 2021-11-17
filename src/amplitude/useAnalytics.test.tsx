import { sendAnalytics } from './useAnalytics';
import { amplitudeMock } from '../mocking/amplitude-mock';
import { render } from '@testing-library/react';
import App from '../App';
import React from 'react';

it('Trigger AnalyticsClient#logEvent når sendAnalytics blir kalt', () => {
    const { debug } = render(<App analyticsClient={amplitudeMock} />);
    amplitudeMock.logEvent = jest.fn(amplitudeMock.logEvent);
    const eventDataForFirstEvent = {
        type: 'knapp',
        data: {
            someKey: 'someValue',
        },
    };
    sendAnalytics(eventDataForFirstEvent);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        eventDataForFirstEvent.type,
        eventDataForFirstEvent.data
    );

    const eventDataForSecondEvent = {
        type: 'navigere',
        data: {
            someKey: 'someValue',
        },
    };
    sendAnalytics(eventDataForSecondEvent);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        eventDataForSecondEvent.type,
        eventDataForSecondEvent.data
    );

    expect(amplitudeMock.logEvent).toHaveBeenCalledTimes(2);
    debug();
});
