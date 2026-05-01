import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: Object3DNode<any, any>;
      liquidMaterial: Object3DNode<any, any>;
    }
  }
}
