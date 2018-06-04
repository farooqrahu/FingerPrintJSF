package test;

public class Test {
	private String value;
	
	
	public String getValue() {
		
		return value;	
	}

	public void setValue(String value) {
		
		this.value = value;
	}
	
	public void submit(){
		System.out.println("HERE IS THE VALUES FOR FINGERPRINT: "+getValue());
	}
	
	
}
