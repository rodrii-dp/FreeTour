import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: '#444',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '70%',
    transform: [{translateY: -12.5}],
  },
  terms: {
    fontSize: 16,
    color: '#4c5667',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: '#FF5A5F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fefeff',
    fontWeight: '500',
  },
  or: {
    textAlign: 'center',
    color: '#4c5667',
    marginVertical: 10,
  },
  googleButton: {
    backgroundColor: '#e4e7ec',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  googleButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPassword: {
    fontSize: 16,
    color: '#4c5667',
    marginTop: 10,
  },
  error: {
    color: '#E74C3C',
    fontWeight: '500',
    textAlign: 'center',
  },
});
