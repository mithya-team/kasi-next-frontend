import { Call, Device } from '@twilio/voice-sdk';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { request } from '@/lib/axios/request';
import logger from '@/lib/logger';
import { formatTime } from '@/lib/utils';

import Button from '@/components/Buttons';
import EndCallButton from '@/components/Buttons/EndCallButton';
import StartCallButton from '@/components/Buttons/StartCallButton';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

export interface ICallBlockProps {
  phoneNumber: string;
}

const CallComponent: React.FC<ICallBlockProps> = ({ phoneNumber }) => {
  const [, setToken] = useState<string>('');
  const [device, setDevice] = useState<Device | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [speakerDevices, setSpeakerDevices] = useState<MediaDeviceInfo[]>([]);
  const [ringtoneDevices, setRingtoneDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedSpeakerDevice, setSelectedSpeakerDevice] = useState<
    string | null
  >(null);
  const [selectedRingtoneDevice, setSelectedRingtoneDevice] = useState<
    string | null
  >(null);
  const [audioSelectionVisible, setAudioSelectionVisible] =
    useState<boolean>(false);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (device) {
      addDeviceListeners(device);
    }
  }, [device]);

  useEffect(() => {
    if (isCalling && currentCall) {
      const hangupButton = document.getElementById('button-hangup-outgoing');
      if (hangupButton) {
        hangupButton.onclick = () => {
          log('Hanging up ...');
          currentCall.disconnect();
        };
      }

      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isCalling, currentCall]);

  const startupClient = async () => {
    log('Requesting Access Token...');
    try {
      const data = await request<{ token: string; identity: string }>(
        '/calls/token',
        { method: 'GET' },
      );
      log('Got a token.');
      setToken(data.token);
      initializeDevice(data.token);
    } catch (err) {
      console.error(err);
      log('An error occurred. See your browser console for more information.');
    }
  };

  const initializeDevice = (token: string) => {
    log('Initializing device');
    const newDevice = new Device(token, {
      logLevel: 2,
      codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
      closeProtection: true,
    });
    setDevice(newDevice);
    newDevice.register();
  };

  const addDeviceListeners = (device: Device) => {
    device.on('registered', async () => {
      log('Twilio.Device Ready to make and receive calls!');
      setIsReady(true);
      await handleGetAudioDevices(); // Automatically fetch audio devices when device is ready
    });

    device.on('error', (error) => {
      log('Twilio.Device Error: ' + error.message);
    });

    device.audio?.on('deviceChange', updateAllAudioDevices);

    if (device.audio?.isOutputSelectionSupported) {
      setAudioSelectionVisible(true);
    }
  };

  const makeOutgoingCall = async () => {
    const params = { To: phoneNumber };

    if (device) {
      log(`Attempting to call ${params.To} ...`);
      const call = await device.connect({ params });

      call.on('accept', () => updateUIAcceptedOutgoingCall());
      call.on('disconnect', updateUIDisconnectedOutgoingCall);
      call.on('cancel', updateUIDisconnectedOutgoingCall);

      setCurrentCall(call);
      setIsCalling(true);
    } else {
      log('Unable to make call.');
    }
  };

  const updateUIAcceptedOutgoingCall = () => {
    log('Call in progress ...');
    setIsCalling(true);
  };

  const updateUIDisconnectedOutgoingCall = () => {
    log('Call disconnected.');
    setIsCalling(false);
    setCurrentCall(null);
    setTimer(0);
  };

  const log = (message: string) => {
    logger(message, 'StartCall.tsx line 150');
  };

  const updateAllAudioDevices = () => {
    if (device) {
      logger(
        { message: 'updateAllAudioDevices invoked on device change' },
        'index.tsx line 359',
      );
      const speakerDevices: MediaDeviceInfo[] = Array.from(
        device.audio?.speakerDevices.get() || [],
      );
      const ringtoneDevices: MediaDeviceInfo[] = Array.from(
        device.audio?.ringtoneDevices.get() || [],
      );
      logger({ speakerDevices, ringtoneDevices }, 'StartCall.tsx line 396');
      setSpeakerDevices(speakerDevices);
      setRingtoneDevices(ringtoneDevices);
    }
  };

  const handleGetAudioDevices = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      toast.error('Allow Microphone access');
    }

    updateAllAudioDevices();
  };

  const handleSpeakerDeviceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedDeviceId = event.target.value;
    setSelectedSpeakerDevice(selectedDeviceId);
    device?.audio?.speakerDevices.set([selectedDeviceId]);
  };

  const handleRingtoneDeviceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedDeviceId = event.target.value;
    setSelectedRingtoneDevice(selectedDeviceId);
    device?.audio?.ringtoneDevices.set([selectedDeviceId]);
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleToggleAudioSelection = () => {
    setAudioSelectionVisible((prev) => !prev);
  };

  const handleMuteToggle = () => {
    if (currentCall) {
      const newMuteState = !isMuted;
      currentCall.mute(newMuteState);
      setIsMuted(newMuteState);
    }
  };

  return (
    <div className='font-primary text-white text-base font-medium  px-7 py-5'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div>
          {isReady ? (
            <>
              {isCalling ? (
                <div className='flex flex-row gap-5 justify-center items-center'>
                  <Typo>{formatTime(timer)}</Typo>
                  <EndCallButton
                    id='button-hangup-outgoing'
                    className='p-[14px]'
                  >
                    End Call
                  </EndCallButton>
                  <Button
                    className='p-[14px] rounded-xl bg-gray-700'
                    onClick={handleMuteToggle}
                  >
                    <SvgIcon name={isMuted ? 'mute' : 'unmute'} />
                  </Button>
                </div>
              ) : (
                <StartCallButton
                  className='p-[14px]'
                  id='button-call'
                  onClick={makeOutgoingCall}
                >
                  Start Call
                </StartCallButton>
              )}
            </>
          ) : (
            <StartCallButton className='p-[14px]' onClick={startupClient}>
              Start Client
            </StartCallButton>
          )}
        </div>
        <div>
          {audioSelectionVisible && (
            <div id='output-selection' className='flex gap-4'>
              <div>
                <Typo classes='pb-2'>Speaker</Typo>

                <select
                  className='inline-block font-primary text-xs rounded-xl font-semibold bg-gray-700 w-[10vw] text-white p-2'
                  id='speaker-devices'
                  value={selectedSpeakerDevice || ''}
                  onChange={handleSpeakerDeviceChange}
                >
                  {speakerDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Typo classes='pb-2'>Ringtone Device</Typo>
                <select
                  className='inline-block font-primary text-xs rounded-xl font-semibold bg-gray-700 w-[10vw] text-white p-2'
                  id='ringtone-devices'
                  value={selectedRingtoneDevice || ''}
                  onChange={handleRingtoneDeviceChange}
                >
                  {ringtoneDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {isReady && (
        <Button onClick={handleToggleAudioSelection}>
          {audioSelectionVisible
            ? 'Hide Audio Selection'
            : 'Show Audio Selection'}
        </Button>
      )} */}
    </div>
  );
};

export default CallComponent;
